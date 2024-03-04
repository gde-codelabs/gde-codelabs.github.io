---
title: Let's serve Mistral-7B on the cloud with dstack
date: 2024-03-01
categories: [dstack, mistral]
tags: [Gradio]
duration: 16:00
authors: Chansung Park
---

{{< step label="Overview" duration="2:00" >}}

This tutorial walks you through steps to serve Large Language Model(LLM) on the cloud using [dstack](https://dstack.ai/). dstack is a framework that helps us allocate jobs on any cloud of your choice. Furthermore, you can choose a VM instance between on-demand and spot to meet your requirements.

> The cloud service provider is called **backend** in dstack, and currently supported backends include [Google Cloud Platform](https://cloud.google.com/)(GCP), [Amazon Web Service](https://aws.amazon.com/)(AWS), [Microsoft Azure](https://azure.microsoft.com/), [Lambda Labs](https://lambdalabs.com/), and [TensorDock](https://tensordock.com/).

This tutorial is not covering how to setup your own cloud accoucnt, gateway on it, and how to request GPU quotas. These topics will be covered in separate tutorials in the future, and this tutorial will be updated to point them when they are up. For the sake of simplicity, this tutorial will use [dstack Sky]() which is a dstack's fully managed cloud service.

## The workflow of this tutorial

1. Initializing dstack project
2. Writing job description 
3. Provisioning the job on the cloud
4. Interacting with Mistral-7B
5. Conclusion

{{< /step >}}

{{< step label="Initializing dstack project" duration="2:00" >}}

Let's create a directory named `mistral` first:

```console
$ mkdir mistral
$ cd mistral
```

Then, inside the `mistral` directory, run `dstack init` command.

> This tutorial assumes that you have already installed dstack package via `pip install "dstack[all]"`

```console
$ dstack init
OK
```

> If you encounter `No default project, specify project name` error, you need to run `dstack server` first as below

```console
$ dstack server &
$ dstack init
OK
```

{{< /step >}}

{{< step label="Writing job description" duration="5:00" >}}

Since dstack is just a tool to provision any kind of job on the cloud, we could leverage almost every existing frameworks to serve a LLM such as [Text Generation Inference](https://github.com/huggingface/text-generation-inference), [vLLM](https://docs.vllm.ai/en/latest/), or something else. 

For instance, write below `yaml` file and save as `serve.dstack.yml` in the `mistral` directory. It describes a job that serve [`mistralai/Mistral-7B-Instruct-v0.2`](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2) via vLLM on a machine with 24GB of GPU memory:

```yml
# serve.dstack.yml
type: service

python: "3.11"
env:
    - MODEL_ID=mistralai/Mistral-7B-Instruct-v0.2
port: 8000
resources:
    gpu: 24GB
commands:
    - pip install vllm
    - python -m vllm.entrypoints.openai.api_server --model $MODEL --port 8000
model:
    format: openai
    type: chat
    name: mistral-7b-it
```

Or, below `yaml` file describes a job that serve the same model via TGI on the same type of machine:

```yml
# serve.dstack.yml
type: service

image: ghcr.io/huggingface/text-generation-inference:latest
env:
    - MODEL_ID=mistralai/Mistral-7B-Instruct-v0.2
port: 8000
resources:
  gpu: 24GB
commands:
    - text-generation-launcher --port 80 --trust-remote-code
model:
    format: tgi
    type: chat
    name: mistral-7b-it
```

> The `model` field in the `yaml` basically exposes the model's endpoint as OpenAI API compatible format. Different LLM serving frameworks exposes different API endpoints, so the `model` field helps exposing different API endpoints in a uniform way.

Choose either of the `yaml` files, then save it under the `mistral` directory as `serve.dstack.yml`.

{{< /step >}}

{{< step label="Provisioning the job on the cloud" duration="2:00" >}}

Now, we are ready to provision a VM instance that serves `mistralai/Mistral-7B-Instruct-v0.2` model via OpenAI API compatible endpoints. To do that, we can simply run `dstack run` command as below:

```console
$ dstack run . -f mistral/serve.dstack.yml
```

Then, it shows the all the possible plan to choose and interactive prompt to confirm the decision. 

```console
⠸ Getting run plan...
    Configuration  serve.dstack.yml             
    Project        deep-diver-main              
    User           deep-diver                   
    Min resources  2..xCPU, 8GB.., 1xGPU (24GB) 
    Max price      -                            
    Max duration   -                            
    Spot policy    auto                         
    Retry policy   no                           

    #  BACKEND  REGION       INSTANCE       RESOURCES                               SPOT  PRICE       
    1  gcp   us-central1  g2-standard-4  4xCPU, 16GB, 1xL4 (24GB), 100GB (disk)  yes   $0.223804   
    2  gcp   us-east1     g2-standard-4  4xCPU, 16GB, 1xL4 (24GB), 100GB (disk)  yes   $0.223804   
    3  gcp   us-west1     g2-standard-4  4xCPU, 16GB, 1xL4 (24GB), 100GB (disk)  yes   $0.223804   
    ...                                                                                            
    Shown 3 of 193 offers, $5.876 max

Continue? [y/n]: y
⠙ Submitting run...
⠏ Launching spicy-treefrog-1 (pulling)
spicy-treefrog-1 provisioning completed (running)
Service is published at ...
```

On the `Continue? [y/n]:` prompt, if you type `y`, it will start the provisioning process.

{{< /step >}}

{{< step label="Interacting with Mistral-7B" duration="5:00" >}}

> If you haven't installed `openai` package, install it via `pip install openai` command.

Now, you can directly interact with the provisioned `mistralai/Mistral-7B-Instruct-v0.2` model using `openai` package as below:

```python
from openai import OpenAI

client = OpenAI(
  base_url="https://gateway.<gateway domain>",
  api_key="<dstack token>"
)

completion = client.chat.completions.create(
  model="mistral-7b-it",
  messages=[
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
  ]
)

print(completion.choices[0].message)
```

Everything is the same as the usage of OpenAI API, but ust remember the followings:
- `base_url` is the endpoint exposed by dstack. You can find this information on the `model` menu in the dstack UI.
- `api_key` is the dstack's access token.
- `model` in `client.chat.completions.create` is the model name that you cnofigured in the `yaml` file from the step 3. 

{{< /step >}}

{{< step label="Conclusion" duration="1:00" >}}

We have gone through how to serve `Mistral-7B-Instruct-v0.2` model on the cloud with dstack. However, it is straight forward to serve different LLM with exactly the same steps since almost every LLMs is supported in the most modern LLM serving frameworks such as TGI, vLLM, and etc.,

## Next 

In the next step, I am going to write byte sized tutorials about 
- how to configure dstack server and gateway on GCP and AWS
- how to use dstack for the other types of jobs such as LLM fine-tuning

Stay tuned. When they are ready, this page will be updated accordingly as well.

{{< /step>}}