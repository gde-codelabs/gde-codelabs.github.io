---
title: Introduction to TFX CLI
date: 2021-09-03
categories: [tfx, gcp]
tags: [VertexAI, ML Pipeline, TFX, MLOps]
duration: 20:00
authors: Chansung Park
---

{{< step label="Overview" duration="1:00" >}}

![tensorflow exteded](https://2.bp.blogspot.com/-bAi9PTHhS_A/XdZJ89UhUII/AAAAAAAABFE/NbSy0gqGRW4AVCEmC6QhSu---NbVmUWcQCLcBGAsYHQ/s1600/0_4wQdCndV1ame3Bpm.png)

The main advantage of using TFX CLI is that you can get a fully working end to end example out of the box. Also, many customizable points are already included such as how to leverage BigQuery, Vertex AI Training/Serving, Dataflow GCP infrastructure. You will see a full capability of TFX at hand with a template project. 

In this codelab, you will use Vertex AI to run TFX Pipeline.

## **Before you begin**

Please follow [Learn how to setup Vertex AI Notebook for pipelines](https://gde-codelabs.github.io/posts/vertex-ai-notebook/#0) codelab to setup Vertex AI Notebook. 

## **What you'll learn**
- How to create TFX pipeline project
- How to compile TFX pipeline
- How to build TFX pipeline
- How to run TFX pipeline on Vertex AI

## **What you'll need**
- A Google Cloud Project
- A Browser, such as Chrome or Firefox
- Familiarity using Python
- Familiarity using TFX

{{< /step >}}

{{< step label="Create TFX pipeline" duration=2:00" >}}

### 1. Setup pipeline name and path. 

```bash
PIPELINE_NAME=tfx-pipeline
PIPELINE_PATH=./tfx-pipeline
```

### 2. Create TFX pipeline project. 

You can create a TFX pipeline project with `tfx template copy` CLI. The `--model` option lets you choose a template model. There are `taxi` and `penguin` as the moment writing this codelab. The `--pipeline-name` sets the name of the pipeine, and the `--destination-path` is the target directory the pipeline project will be created. 

```bash
$ tfx template copy --model=taxi \
       --pipeline-name=$PIPELINE_NAME \
       --destination-path=$PIPELINE_PATH
```

### 3. Print what's include in the populated project.
```bash
$ tree ./$PIPELINE_PATH
```

### 4. Examine each files and directories.
![directory-structure](/assets/images/tfx-cli-101/directory-structure.png)

You can explore what's included in each file, but here is a short description.

### *_runner.py
  - `local_runner.py` lets you run the pipeline in local environment. You don't need any orchestrator installed on your local environment. It is used to verify the code. You can choose `kubeflow_runner.py` if the underlying orchestrator is based on Kubeflow 1.x. If your system supports Kubeflow version > 2.0, you need `kubeflow_v2_runner.py`. `Vertex AI Pipeline` platform is also based on Kubeflow 2.x, `kubeflow_v2_runner.py` should be selected if you want to load the pipeline on Vertex AI.

### models
  - The data preprocessing and modeling(based on `tf.keras` and `tf.estimator`) files are listed in `models` directory. You can find how to write modules for TFX `Transform` and `Trainer` components.

### pipeline
  - `pipeline/pipeline.py` defines the whole pipeline. You can find how each TFX component is connected each other to build up the whold pipeline. Also, you can think of `pipeline/configs.py` as a place to define global variables used across the project. This file is important when you want to leverage `Vertex Training` and `Vertex Precition` services. You can find what the configurations for each looks like.

{{< /step >}}

{{< step label="Create & Compile Pipeline" duration=2:00" >}}

Before running the pipeline, it should be created or compiled. TFX provides `tfx pipeline create` and `tfx pipeline compile` CLIs for this purpose. Let's see what they do.

```bash
$ tfx pipeline create --pipeline-path=... \
       --engine=... \ 
       --build-image
```

`tfx pipeline create` CLI is used to create tfx pipeline. `--pipeline-path` is a mandatory argument, and the one of the paths for `local.py`, `kubeflow_runner.py`, or `kubeflow_v2_runner.py ` should be specified. Also note that `--engine` parameter should be specified accordingly. The [official document](https://www.tensorflow.org/tfx/guide/cli#create) says "If the engine is not set, the engine is auto-detected based on the environment.", but it is safe to be set manually. 

```bash
$ tfx pipeline update --pipeline-path=... \
       --engine=... \ 
```

`tfx pipeline update` CLI lets you update the previously created pipeline. All the arguments from `tfx pipeline create` are also available for `tfx pipeline update` CLI. That means you can choose different running environments whenever you want. 

When `--build-image` option is specified, TFX CLI will build a custom TFX docker image, and every component will be run based on the built image. The image tag can be modified with `PIPELINE_IMAGE` defined in `pipeline/configs.py`.

```bash
$ tfx pipeline compile --pipeline-path=... \
       --engine=... \ 
```

Once you run `tfx pipeline create`, you can run the pipeline. However, you have to run `tfx pipeline create` whenever the local environment changes. For instance, there are a number of situations that only fresh environment is availalbe such as GitHub Action, Cloud Build, and so on. 

{{< /step >}}

{{< step label="Run Pipeline Locally" duration=2:00" >}}

```bash
$ tfx pipeline create --pipeline-path=$PIPELINE_PATH/local_runner.py \
      --engine=local
```

```bash
$ tfx run create --pipeline-name=$PIPELINE_NAME \
      --engine=local
```

{{< /step >}}


{{< step label="Run on Vertex AI" duration=2:00" >}}

```bash
$ tfx pipeline update --pipeline-path=$PIPELINE_PATH/kubeflow_v2_runner.py \
      --engine=vertex
```

```bash
GCP_PROJECT_ID="..."
GCP_PROJECT_REGION="..."

$ tfx run create --pipeline-name=$PIPELINE_NAME \
      --engine=vertex
      --project=$GCP_PROJECT_ID
      --region=$GCP_PROJECT_REGION
```

{{< /step >}}

{{< step label="[OPTIONAL] Run Pipeline Programatically" duration=2:00" >}}

```python
GCP_PROJECT_ID="..."
GCP_PROJECT_REGION="..."
PIPELINE_DEFINITION_FILE="pipeline.json"

from kfp.v2.google import client

pipelines_client = client.AIPlatformClient(
    project_id=GCP_PROJECT_ID,
    region=GCP_PROJECT_REGION,
)

_ = pipelines_client.create_run_from_job_spec(PIPELINE_DEFINITION_FILE, 
                                              enable_caching=True)
```

{{< /step >}}