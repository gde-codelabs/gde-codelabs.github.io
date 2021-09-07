---
title: Reflect Changes in Codebase to MLOps Pipeline
date: 2021-09-07
categories: [tfx, gcp]
tags: [VertexAI, ML Pipeline, TFX, MLOps]
duration: 40:00
authors: Chansung Park
---

{{< step label="Overview" duration="5:00" >}}

![workflow1](/assets/images/model-training-ci-cd-part1/workflow1.png)

One of the two common scenarios for MLOps system is to trigger MLOps pipeline when we have a new model or data preprocessing strategies integrated into the exsiting codebase. In this way, we can check if brand new models from industry or academy outperforms the currently deployed model, and if they are we can proceed replacing the current model with the newly trained model to make a better user experience.
- The other common scenario is to adapt to changes in data by retraining the current model. 

## **Before You Begin**
Please follow [Introduction TFX CLI Codelab](https://gde-codelabs.github.io/posts/tfx-cli-101) before begin to grasp an idea what TFX CLI is and how to run a TFX pipeline on Vertex AI platform. This codelab will use the TFX CLI to setup a initial codebase for the codelab.

## **What You’ll Learn**
- How to kick off MLOps project on Vertex AI with TFX
- How to write GitHub Action to detect changes in codebase
- How to write Cloud Build to build MLOps pipeline
- How to decouple data preprocessing, training modules from the pipeline

## **What You'll Need**
- A Google Cloud Project
- A Browser, such as Chrome or Firefox
- Familiarity using Python
- Familiarity using TFX

## **NOTE**
This codelab shows the first part of the "Model Training as a CI/CD System". When the second part is written, this codelab will be updated to provide the link for it. The subtitle for the second part is **「Trigger, schedule, and run MLOps pipelines」**. There are counterpart repositories for both [part1, Model Training as a CI/CD System](https://github.com/deep-diver/Model-Training-as-a-CI-CD-System) and [part2, Trigger, schedule, and run MLOps pipelines](https://github.com/sayakpaul/CI-CD-for-Model-Training). You can find out the actual notebook used to realize this codelabs.

{{< /step >}}

{{< step label="Create TFX Project with CLI" duration="5:00" >}}

{{< /step >}}

{{< step label="Setup GitHub Action" duration="5:00" >}}

{{< /step >}}

{{< step label="Setup Cloud Build" duration="5:00" >}}

{{< /step >}}

{{< step label="Simulate Changes in Codebase" duration="5:00" >}}

{{< /step >}}

{{< step label="Decouple Modules" duration="5:00" >}}

{{< /step >}}

{{< step label="Modify GitHub Action, Cloud Build for Decoupling Modules" duration="5:00" >}}

{{< /step >}}

{{< step label="Check Effect of Decoupling Modules" duration="5:00" >}}

{{< /step >}}

{{< step label="Summary" duration="5:00" >}}

{{< /step >}}