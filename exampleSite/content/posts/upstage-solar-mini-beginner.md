---
title: Try out Upstage's SOLAR mini chat as API
date: 2024-03-02
categories: [solar]
tags: [upstage, solar]
duration: 26:00
authors: Chansung Park
---

{{< step label="Overview" duration="3:00" >}} 

[Upstage](https://www.upstage.ai/) has developed remarkable [Solar 10.7B LLM](https://huggingface.co/upstage/SOLAR-10.7B-v1.0) model by [Depth Up-Scaling](https://arxiv.org/pdf/2312.15166.pdf) technique applied on [LLaMA2](https://llama.meta.com/llama2/) and [Mistral-7B](https://mistral.ai/news/announcing-mistral-7b/) base models. 

![](https://images.squarespace-cdn.com/content/v1/659384103b38c97cdaf368bd/3125b51c-329a-49a5-820b-9a212c5f548a/Screenshot+2024-01-25+at+1.01.27%E2%80%AFPM.png?format=2500w)

As of writing this tutorial on 03.04.2024, Upstage has opened up Solar model (called `Solar mini chat`) as API, and it is even more powerful model than Solar 10.7B which was open sourced a while ago. This tutorial will walk you through how to get access of the `Solar mini chat` and how to make a call to that model in Python.

> Upstage offers a free trial of Solar API until 03.31.2024, so try it out for free! Even if the free trial date is expired after that, this tutorial should be applicable for paid users.

## The workflow of this tutorial

1. Signup Upstage developer console
2. Exploring Upstage developer console
3. Grasp access token for Solar mini chat
4. Interacting with Solar mini chat
5. Interacting with Solar mini chat with Stream mode
5. Conclusion

{{< /step >}}

{{< step label="Signup Upstage developer console" duration="3:00" >}}

If you already have an account for [Upstage's devleoper console](https://console.upstage.ai/), you can simply skip this step. Otherwise, Go to the [Upstage's devleoper console](https://console.upstage.ai/), then you will see similar screen as below:

![signup](/assets/images/upstage-solar-mini-beginner/signup.png)

Click the `Sign up` link, or click `Continue with Google` button if you want to sign up with your Google account. After that, you are all set!

{{< /step >}}

{{< step label="Exploring Upstage developer console" duration="3:00" >}}

On the left navigation panel, the most relevant menus to this tutorial are `Playground / Chat` and `APIs / Solar`. Let's try out Solar mini chat model with the first menu.

![console](/assets/images/upstage-solar-mini-beginner/console.png)

It is very simple chat interface, and it should be looking familiar if you have used ChatGPT, Gemini, or other LLM powered chat applications. Just type anything in the Textbox at the bottom, then you will get the response back. 

> In my personal opinion, chat interface is a must have toolbox for developers who want to build anything on top of LLM. Experiment a lot to get the prompts that give you the best outputs.

{{< /step >}}

{{< step label="Grasp access token for Solar mini chat" duration="5:00" >}}

Now, let's move to the second menu, `APIs / Solar`. You will see the similar screen as below:

![console](/assets/images/upstage-solar-mini-beginner/access-token.png)

On the very top of the screen, you can grasp your own access token for the Solar mini chat as API. Clik the `Copy` button, then it will be copied automatically. Also, scroll down the page, then check out the actual model name, `solar-1-mini-chat`. These two pieces of information will be required to interact with Solar mini chat model as API programatically.

> If you scroll down the page, you will notice the other two models, `solar-1-mini-translate-enko` and `solar-1-mini-translate-koen	`. These two models are fine-tuned variants of the base Solar model that works well on translation between English and Korean.

{{< /step >}}

{{< step label="Interacting with Solar mini chat" duration="5:00" >}}

The API for the Upstage's Solar mini chat is provided as OpenAI's API compatible format. This means you can interact with it by using OpenAI's [openai](https://pypi.org/project/openai/) Python package. So, the first step is to install the openai Python package as below:

```console
$ pip install openai
```

Then, we could easily interact with the Solar mini chat model as below: 

```python
from openai import OpenAI

client = OpenAI(
  base_url="https://api.upstage.ai/v1/solar",
  api_key="<YOUR-UPSTAGE-SOLAR-ACCESS-TOKEN>"
)

completion = client.chat.completions.create(
  model="solar-1-mini-chat",
  messages=[
    {
        "role": "user", 
        "content": "Compose a poem that explains the concept of recursion in programming."
    }
  ]
)

print(completion.choices[0].message.content)
```

Here are some things to recognize:
- `base_url` should points to `https://api.upstage.ai/v1/solar`.
- you should insert your own Solar API in the `api_key` that you grasped from the step 3.
- the `model` name should be `solar-1-mini-chat`. If you want to use English-Korean or Korean-English translation model, replace the `model` name to `solar-1-mini-translate-enko` or `solar-1-mini-translate-koen` respectively.

> Here is the simplest possible [Colab notebook](https://colab.research.google.com/drive/1gtChVPtb55eiUxdc2dca0OsXqYR3-IMn?usp=sharing) that demonstrates the usage.

The above code snippet should print out something similar as below:

```
In the digital realm, where code is king,
A concept reigns, unique and grand,
Recursion, it's called, a method divine,
That solves problems, a beautiful design.

Imagine a task, a mountain so grand,
Too large to conquer by hand,
...
```

{{< /step >}}

{{< step label="Interacting with Solar mini chat with Stream mode" duration="5:00" >}}

It is also straight forward to consume generated output in `stream` mode if you are already familiar with the usage of OpenAI's openai package.

```python
from openai import OpenAI

client = OpenAI(
  base_url="https://api.upstage.ai/v1/solar",
  api_key="<YOUR-UPSTAGE-SOLAR-ACCESS-TOKEN>"
)

completion = client.chat.completions.create(
  model="solar-1-mini-chat",
  messages=[
    {
        "role": "user", 
        "content": "Compose a poem that explains the concept of recursion in programming."
    }
  ],
  stream=True
)

for stream in completion:
    print(stream.choices[0].delta.content, end="")
```

There are just two differences comparing to the step 4.
- add `stream=True` parameter to the `client.chat.completions.create` method
- the returned value from the `client.chat.completions.create` method is a type of `openai.Stream` object, and it is iterable object. When you iterate it, you can access to the streamed output via `choices[0].delta.content` attribute.

For further detailed usage of the API, check out the [OpenAI's API documentation](https://platform.openai.com/docs/api-reference/making-requests).

{{< /step >}}

{{< step label="Conclusion" duration="2:00" >}}

We have gone through how to interact with Upstage's Solar mini chat model as API. As you experience it, you will quickly notice that it is not only very powerful but also very speedy model due to its compact size ( just 10.7B! ).

Also, it is very nice that the API for Solar mini chat is compatible to OpenAI's API. This will help us smoothly migrating from ChatGPT to much smaller and cheaper Solar mini model. We can't be sure it will be as much powerful as ChatGPT on every kinds of task, but it is possible for many certain/small-scoped task oriented business to switch to Solar model. 

{{< /step >}}
