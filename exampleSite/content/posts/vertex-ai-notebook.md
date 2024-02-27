---
title: Learn how to setup Vertex AI Notebook for pipelines
date: 2021-09-03
categories: [jupyter, gcp]
tags: [VertexAI, Notebook]
duration: 14:00
authors: Chansung Park
---

{{< step label="Overview" duration="1:00" >}}

[Vertex AI platform](https://cloud.google.com/vertex-ai) provides the fully managed version of [JupyterLab](https://jupyter.org/). JupyterLab has been the most popoular tool for data scientists and machine learning engineer. It comes with not only Jupyter Notebook but also Terminal, and so on. 

![jupyter lab](https://jupyter.org/assets/labpreview.png)

## **What you'll learn**
- How to setup IAM
- How to setup and launch Vertex AI Notebook

## **What you'll need**
- A Google Cloud Project
- A Browser, such as Chrome or Firefox

{{< /step >}}

{{< step label="Setup IAM" duration=6:00" >}}

If you want to run the pipeline on Vertex AI, your GCP service account should have the following roles.
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
![service account setup 1](/assets/images/vertex-ai-notebook/service-account-1.png)

3. Add roles to the service account. It should have five different roles, `Vertex AI Custom Code Service Agent`, `Vertex AI Service Agent`, `Vertex AI User`, `Storage Object Admin`, and `Storage Object Creator`
![service account setup 2](/assets/images/vertex-ai-notebook/service-account-2.png)

4. Click `DONE` button at the bottom.
![service account setup 3](/assets/images/vertex-ai-notebook/service-account-3.png)

### **Check the service account**

1. Go to [**IAM menu**](https://console.cloud.google.com/iam-admin/iam) on the left pane
2. You should be able to see your service account like below
![service account check](/assets/images/vertex-ai-notebook/service-account-4.png)

{{< /step >}}

{{< step label="Enable Vertex AI API" duration="1:00" >}}

In order to use APIs for Vertex AI, you have to enable it. After enabling the APIs, you will be able to access APIs for Vertex AI in other GCP services such as Vertex AI Notebook or Cloud Build.

To do this, please visit [Vertex AI API](https://console.developers.google.com/apis/api/aiplatform.googleapis.com/overview) and click `ENABLE` button. The UI looks something like below.

![vertex ai api](/assets/images/vertex-ai-notebook/vertex-ai-api.png)

{{< /step >}}

{{< step label="Create Vertex Notebook, Install dependencies" duration="5:00" >}}

Before jumping into the TFX CLI, let's create a environment to play with. In this codelab, we will use a JupyterLab or Terminal in `Vertex Notebook` service.

### **Enable Vertex Notebook API**

1. Find and click [**Vertex AI**](https://console.cloud.google.com/vertex-ai) on the left navigation pane
2. Go to [**Notebook** menu](https://console.cloud.google.com/vertex-ai/notebooks) on the left pane. 
3. It will bring you to a new page to ask enabling the Notebook service. Click `ENABLE` button on Notebooks API. It will take few minutes
4. When API enabling process is finished, you will be brought to the legacy **AI PLatform Notebooks**. Go back to [Vertex Notebook](https://console.cloud.google.com/vertex-ai/notebooks) manually

### **Create a JupterLab server**

1. Click the following sequence. `+ NEW INSTNACE`  ➡️  `TensorFlow Enterprise`  ➡️  `TensorFlow Enterprise 2.6 (with LTS)`  ➡️  `Without GPUs`
![notebook](/assets/images/vertex-ai-notebook/notebook.png)

2. The default setup page will show up. Click `CREATE` button if you think this setup is for you. In case you want to have a custom machine type, click `ADVANCED OPTIONS` and configure the machine type as you like in the new page like below.
![notebook-creation-a](/assets/images/vertex-ai-notebook/notebook-creation.png)

3. JupyterLab server creation will take few minutes. Once it is done, the `OPEN JUPYTERLAB` button will appear. Cleck that button, and it will bring you to a new page for JupyterLab.
![notebook-creation-b](/assets/images/vertex-ai-notebook/notebook-open.png)

{{< /step >}}

{{< step label="[OPTIONAL] Install dependencies" duration=1:00" >}}

1. From the launching page, select `Python 3` under `Notebook` section. It will create an empty notebook for you.
![notebook-selection](/assets/images/vertex-ai-notebook/notebook-selection.png)

2. Check Python version and install TFX and KFP packages. The up-to-date versions of those packages are `1.2.0` and `1.6.1 as of writing this codelab.
![notebook-package-install](/assets/images/vertex-ai-notebook/notebook-package-install.png)
    - **TFX > 1.0** doesn't support **Python 3.9** at this time, so make sure the Python version is under **3.9**.

{{< /step >}}