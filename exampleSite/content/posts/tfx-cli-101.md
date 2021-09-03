---
title: Introduction to TFX CLI
date: 2021-09-03
categories: [tfx, gcp]
tags: [VertexAI, ML Pipeline, TFX, MLOps]
duration: 20:00
authors: Chansung Park
---

{{< step label="Overview" duration="1:00" >}}

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

1. Setup pipeline name and path. 

```bash
PIPELINE_NAME=tfx-pipeline
PIPELINE_PATH=tfx-pipeline
```

2. Create TFX pipeline project. The `--model` option lets you choose a template model. There are `taxi` and `penguin` as the moment writing this codelab. The `--pipeline-name` sets the name of the pipeine, and the `--destination-path` is the target directory the pipeline project will be created. 

```bash
$ !tfx template copy --model=taxi \
       --pipeline-name=$PIPELINE_NAME \
       --destination-path=$PIPELINE_PATH
```

3. Print what's include in the populated project.
```bash
$ tree ./$PIPELINE_PATH
```

4. Examine each files and directories.
![directory-structure](/assets/images/tfx-cli-101/directory-structure.png)

{{< /step >}}

{{< step label="[OPTIONAL] Compile" duration=2:00" >}}

{{< /step >}}

{{< step label="Build" duration=2:00" >}}

{{< /step >}}

{{< step label="Run locally" duration=2:00" >}}

{{< /step >}}

{{< step label="Run on Vertex AI" duration=2:00" >}}

{{< /step >}}
