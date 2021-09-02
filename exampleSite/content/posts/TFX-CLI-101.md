---
title: Introduction to TFX CLI
date: 2021-08-25
categories: [MLOps]
tags: [VertexAI, Pipeline, TFX, tutorial]
duration: 26:00
authors: Chansung Park
---

{{< step label="TFX CLI in a nutshell" duration="1:00" >}}

The main advantage of using TFX CLI is that you can get a fully working end to end example out of the box. Also, many customizable points are already included such as how to leverage BigQuery, Vertex AI Training/Serving, Dataflow GCP infrastructure. You will see a full capability of TFX at hand with a template project. 

{{< /step >}}

{{< step label="Create TFX project from templates" duration=2:00" >}}

There are two template projects, taxi and penguin at the moment, and we will use `taxi` template. The following TFX CLI shows how to generate a new TFX project based on `taxi` template. You can specify which template to use in `--model`, the name of pipeline in `--pipeline-name`, and the path where to store the generated project in `--destination-path`.

```bash
$ tfx template copy --model=taxi \
                    --pipeline-name=tfx-pipeline \
                    --destination-path=tfx-pipeline
```

When you run the `tfx template copy` CLI, it will create a folder with the name specified in `--destination-path`. Let's go inside that directory.

```bash
$ cd tfx-pipeline
```

The below shows how the directories/files are organized in the project. I have ommited some minor files like caching, testing, `__init__.py` to save some space here, but the most important files for understanding TFX pipeline are listed.

```bash
$ tree
.
├── data
│   └── data.csv
├── local_runner.py
├── kubeflow_v2_runner.py
├── data_validation.ipynb
├── model_analysis.ipynb
├── models
│   ├── estimator_model
│   │   ├── model.py
│   ├── features.py
│   ├── keras_model
│   │   ├── constants.py
│   │   ├── model.py
│   ├── preprocessing.py
└── pipeline
    ├── configs.py
    └── pipeline.py
```

### **data**
`data` directory contains `data.csv` which comes with taxi data for this template project. 

### ***_runner.py**
You can currently run the TFX pipeline on two different environments out of the box using this template project.

`local_runner.py` is used for local environment. It is useful for unit test before going to the cloud, but it is also useful when you have high-end devices like GPU in your local machine. TFX is all about pipelining and orchestrating different components consisting of the entire MLOps pipeline. For example, as a researcher, you don't want to go for deployment but for tracking experiments. In this case, you can build a pipeline from data injection to model validation.

`kubeflow_v2_runner.py` is used for kubeflow environment. There is another file named `kubeflow_runner.py`, and this is for supporting the past version of kubeflow 1.x. Also, most importantly, `kubeflow_v2_runner.py` should be used if you want to leverage `Vertex AI` platform on GCP since `Vertex AI` is built on top of kubeflow 2.x.

### ***.ipynb**
In the previous TFX version before the rise of `Vertex AI`, some of the out of the box visualizations for data validation and model analysis were embedded effortless in kubeflow pipeline dashboard. However, it is not supported yet in `Vertex AI`.

In order to overcome this issues, this template project provides `data_validation.ipynb` and `model_analysis.ipynb` Jupyter notebooks for visualizing the outputs form `StatisticsGen` and `Evaluator` TFX components respectively.

### **models**
`models` directory gives you some idea how to perform data preprocessing, modeling, and model training steps. Furthermore, you can find modeling examples in two different flavours of using `Keras` and `tf.estimator`.

### **pipeline**
Finally, `pipeline.py` in the `pipeline` directory defines how the TFX pipeline is constructed by connecting all the different TFX components. This gives you a nice overview what MLOps pipeline looks like. 

`pipeline` directory contains one more file named `configs.py`. `configs.py` is for configuring all the parameters passed down to the components. For instance, you can setup `Vertex AI Training` and `Vertex AI Prediction` directly integrated into the TFX pipeline.

{{< /step >}}

{{< step label="Look around (pipeline)" duration="5:00" >}}

Let's see the [`pipeline/pipeline.py`](https://github.com/tensorflow/tfx/blob/master/tfx/experimental/templates/taxi/pipeline/pipeline.py) to grab a big picture how the TFX pipeline is constructued.

![TFX Pipeline](https://www.tensorflow.org/tfx/guide/images/prog_fin.png)

```python
components = []
```

First a list variable `components` is declared. This list is going to store all the TFX components. Just note that the you don't have to put TFX component into `components` in order. The dependencies between TFX components are defined by their inputs and outputs. The `components` is just here for storing all the TFX components to handover to the system later.

```python
example_gen = tfx.components.CsvExampleGen(input_base=data_path)
components.append(example_gen)
```

The very first TFX component is [`CsvExampleGen`](https://www.tensorflow.org/tfx/api_docs/python/tfx/v1/components/CsvExampleGen). A component in MLOps pipeline takes inputs and produces outputs, and it stores some metadata from that process. I am going to explain each component in this manner. For example, `CsvExampleGen` takes CSV form of data as the input, and it produces train and eval examples as the output. The input CSV data is explicitly specified via `input_base` parameter. 

```python
statistics_gen = tfx.components.StatisticsGen(
    examples=example_gen.outputs['examples'])
# components.append(statistics_gen)
```

From the second component, all the `components.append(...)` statements are commented out because the TFX template wants you to try out and see the impact of each component by removing a commented out statement at a time. `StatisticsGen` takes generated output from the `CsvExampleGen` as the input, and it produces statistics of features and random samples over training data as the outputs. These outputs can be used for data visualization and validation later. 

```python
schema_gen = tfx.components.SchemaGen(
      statistics=statistics_gen.outputs['statistics'],
      infer_feature_shape=True)
# components.append(schema_gen)
```

`SchemaGen` generates a schema by infering information based on the output of `StatisticsGen`. The output of this component will be used in the downstream component, `Transform`. You can optionally include `ExampleValidator` component whose inputs are the outputs of `StatisticsGen` and `SchemaGen`. The role of `ExampleValidator` component is to check if certain type of data doesn't not meet the requirements. You can think of it as a sort of data anomaly detector.

```python
transform = tfx.components.Transform(
    examples=example_gen.outputs['examples'],
    schema=schema_gen.outputs['schema'],
    preprocessing_fn=preprocessing_fn)
# components.append(transform)
```

`Transform` generates a DAG to be attatched to the TensorFlow training Graph which will be generated by the downstream component, `Trainer`. The role of this component is to perform feature engineering. If you think about the data pre-processing step, you can figure out what kind of inputs `Transform` needs. For example, it has to know which data to transform, and that is the output of `ExampleGen`. It also has to know how the data looks like, and that is acquired from the output of `SchemaGen`. Lastly, it has to know how to pre-process the given data, and that preprocessing function is specified in `preprocessing_fn` parameter. You can switch from `preprocessing_fn` to `module_file` if you have everything in a single file. 

```python
trainer_args = {
    'run_fn': run_fn,
    'transformed_examples': transform.outputs['transformed_examples'],
    'schema': schema_gen.outputs['schema'],
    'transform_graph': transform.outputs['transform_graph'],
    'train_args': train_args,
    'eval_args': eval_args,
}

if ai_platform_training_args is not None:
    trainer_args['custom_config'] = {
        tfx.extensions.google_cloud_ai_platform.TRAINING_ARGS_KEY:
            ai_platform_training_args,
    }
    trainer = tfx.extensions.google_cloud_ai_platform.Trainer(**trainer_args)
else:
    trainer = tfx.components.Trainer(**trainer_args)
# components.append(trainer)
```

There are two `Trainer` components, one for the Google Cloud Vertex AI Training and the other one for local environment. The local environment here means that the training will be run on a single node in a Kubernetes infrastructure. If you use `google_cloud_ai_platform.Trainer` within Google Cloud Vertex AI Training, you can leverage the power of its distributed training capability. In any cases, `Trainer` takes the transformed data and the transform DAG from the output of `Transform` and some of the parameters. Also note that it has a similar parameter `run_fn` as `preprocessing_fn` in the `Transform`. The function assigned to the `run_fn` defines the strucuture of the model and how the model should be learnt.

```python
model_resolver = tfx.dsl.Resolver(
      strategy_class=tfx.dsl.experimental.LatestBlessedModelStrategy,
      model=tfx.dsl.Channel(type=tfx.types.standard_artifacts.Model),
      model_blessing=tfx.dsl.Channel(
          type=tfx.types.standard_artifacts.ModelBlessing)).with_id(
              'latest_blessed_model_resolver')
# components.append(model_resolver)
```

`Resolver` is an auxiliary component to define a strategy how to select the latest best model. This is going to be used as an input of the downstream component, `Evaluator` to compare with the currently trained model with given metrics. The only provided standard strategy is `LatestBlessedModelStrategy` which selects the latest best model. You can write your own strategy by subclassing `ResolverStrategy`. 

```python
evaluator = tfx.components.Evaluator(
    examples=example_gen.outputs['examples'],
    model=trainer.outputs['model'],
    baseline_model=model_resolver.outputs['model'],
    # Change threshold will be ignored if there is no baseline (first run).
    eval_config=eval_config)
# components.append(evaluator)
```

`Evaluator` evaluates the currently trained model. The output of the `Resolver` goes into the `baseline_model` parameter as an input. Given by that you can define some criterias how to compare between the `baseline_model` to the currently trained model. For example, you can include `tfma.GenericValueThreshold` to define an absolute threshold that the model must meet, and you can also include `tfma.GenericChangeThreshold` to define a threshold that how the currently trained one can be evaluated as the better one than the latest best model. 

```python
eval_config = tfma.EvalConfig(
    model_specs=[
        tfma.ModelSpec(
            signature_name='serving_default',
            label_key='tips_xf',
            preprocessing_function_names=['transform_features'])
    ],
    slicing_specs=[tfma.SlicingSpec()],
    metrics_specs=[
        tfma.MetricsSpec(metrics=[
            tfma.MetricConfig(
                class_name='BinaryAccuracy',
                threshold=tfma.MetricThreshold(
                    value_threshold=tfma.GenericValueThreshold(
                        lower_bound={'value': eval_accuracy_threshold}),
                    change_threshold=tfma.GenericChangeThreshold(
                        direction=tfma.MetricDirection.HIGHER_IS_BETTER,
                        absolute={'value': -1e-10})))
        ])
    ])
```

You can see the example of the `eval_config` like above.

```python
if ai_platform_serving_args is not None:
    pusher_args['custom_config'] = {
        tfx.extensions.google_cloud_ai_platform.experimental
        .PUSHER_SERVING_ARGS_KEY:
            ai_platform_serving_args
    }
    pusher = tfx.extensions.google_cloud_ai_platform.Pusher(**pusher_args)
else:
    pusher_args['push_destination'] = tfx.proto.PushDestination(
        filesystem=tfx.proto.PushDestination.Filesystem(
            base_directory=serving_model_dir))
    pusher = tfx.components.Pusher(**pusher_args)
# components.append(pusher)
```

`Pusher` basically pushes the survivided model to a certain location. It can be just a plain storage like GCS bucket, but you can also directly host your model for prediction on Google Cloud Vertex AI Prediction with `google_cloud_ai_platform.Pusher` component.

```python
return tfx.dsl.Pipeline(
    pipeline_name=pipeline_name,
    pipeline_root=pipeline_root,
    components=components,
    metadata_connection_config=metadata_connection_config,
    beam_pipeline_args=beam_pipeline_args,
)
```

After defining a number of components that build up the whole pipeline, the last step is to define and return the `Pipeline` with the `components`. 

{{< /step >}}

{{< step label="Uncomment pipeline components" duration="5:00" >}}

{{< /step >}}

{{< step label="Compile TFX pipeline" duration="2:00" >}}


```bash
$ tfx pipeline compile --pipeline-path=kubeflow_v2_runner.py 
                       --engine=vertex
```

{{< /step >}}

{{< step label="Build custom TFX docker image" duration="2:00" >}}

```bash
$ tfx pipeline create --pipeline-path=kubeflow_v2_runner.py 
                      --engine=vertex 
                      --build-image
```

{{< /step >}}

{{< step label="Integrate with GCP (Vertex Pipeline)" duration="5:00" >}}

```bash
$ tfx run create --engine=vertex 
                 --pipeline_name=tfx-pipeline
                 --project=$GCS_PROJECT
                 --region=us-central1
```

![](/assets/tfx-cli-101/pipeline.png)

{{< /step >}}

{{< step label="Integrate with GCP (Dataflow)" duration="5:00" >}}

{{< /step >}}

{{< step label="Integrate with GCP (Vertex Training)" duration="5:00" >}}

{{< /step >}}

{{< step label="Integrate with GCP (Vertex Prediction)" duration="5:00" >}}

{{< /step >}}
