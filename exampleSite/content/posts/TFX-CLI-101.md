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

The below shows how the directories/files are organized in the project. 

```bash
$ tree
.
├── __init__.py
├── __pycache__
│   └── kubeflow_v2_runner.cpython-37.pyc
├── data
│   └── data.csv
├── data_validation.ipynb
├── kubeflow_runner.py
├── kubeflow_v2_runner.py
├── local_runner.py
├── model_analysis.ipynb
├── models
│   ├── __init__.py
│   ├── estimator_model
│   │   ├── __init__.py
│   │   ├── constants.py
│   │   ├── model.py
│   │   └── model_test.py
│   ├── features.py
│   ├── features_test.py
│   ├── keras_model
│   │   ├── __init__.py
│   │   ├── constants.py
│   │   ├── model.py
│   │   └── model_test.py
│   ├── preprocessing.py
│   └── preprocessing_test.py
└── pipeline
    ├── __init__.py
    ├── __pycache__
    │   ├── __init__.cpython-37.pyc
    │   ├── configs.cpython-37.pyc
    │   └── pipeline.cpython-37.pyc
    ├── configs.py
    └── pipeline.py
```

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