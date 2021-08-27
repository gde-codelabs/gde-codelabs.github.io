---
title: Learn what TFX CLI is, how we can use it for real world MLOps project.
date: 2021-08-25
categories: [MLOps]
tags: [VertexAI, Pipeline, TFX, tutorial]
duration: 40:00
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