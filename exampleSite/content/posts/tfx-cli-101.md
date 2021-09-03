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

{{< step label="IAM setup" duration=2:00" >}}

For standalone TFX users, this is an optional step. However, If you want to run the pipeline on Vertex AI, your GCP service account should have the following roles.
- Vertex AI Custom Code Service Agent
- Vertex AI Service Agent
- Vertex AI User
- Storage Object Admin
- Storage Object Creator

### **Visit IAM menu**

1. Open [GCP Console](https://console.cloud.google.com/) on the browser
2. Create a new project or use the existing one
3. Find and click [**IAM & Admin** menu](https://console.cloud.google.com/iam-admin/) on the left navigation pane
4. Go to [**Service Accounts** menu](https://console.cloud.google.com/iam-admin/serviceaccounts) on the left pane

### **Create a service account**

1. Click `+ CREATE SERVICE ACCOUNT` at the top bar

2. Enter `Service account details` as the first step. The second text bos will be autofiled.
![service account setup 1](/assets/images/tfx-cli-101/service-account-1.png)

3. Add roles to the service account. It should have five different roles, `Vertex AI Custom Code Service Agent`, `Vertex AI SErvice Agent`, `Vertex AI User`, `Storage Object Admin`, and `Storage Object Creator`
![service account setup 2](/assets/images/tfx-cli-101/service-account-2.png)

4. Click `DONE` button at the bottom.
![service account setup 3](/assets/images/tfx-cli-101/service-account-3.png)

### **Check the service account**

1. Go to [**IAM menu**](https://console.cloud.google.com/iam-admin/iam) on the left pane
2. You should be able to see your service account like below
![service account check](/assets/images/tfx-cli-101/service-account-4.png)

{{< /step >}}

{{< step label="Setup and requirements" duration=2:00" >}}

{{< /step >}}

{{< step label="Install required packages" duration=2:00" >}}

{{< /step >}}

{{< step label="Create TFX pipeline" duration=2:00" >}}

{{< /step >}}

{{< step label="(optional)Compile TFX pipeline" duration=2:00" >}}

{{< /step >}}

{{< step label="Build TFX pipeline" duration=2:00" >}}

{{< /step >}}

{{< step label="Run TFX pipeline locally" duration=2:00" >}}

{{< /step >}}

{{< step label="Run TFX pipeline on Vertex AI" duration=2:00" >}}

{{< /step >}}
