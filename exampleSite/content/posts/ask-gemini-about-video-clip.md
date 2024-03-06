---
title: Ask Gemini about video clip in Python
date: 2024-03-03
categories: [gemini, vertexai]
tags: [Gemini, VertexAI]
duration: 22:00
authors: Chansung Park
---

{{< step label="Overview" duration="2:00" >}}

This tutorial walks you through steps to ask questions about a video clip to [Gemini](https://deepmind.google/technologies/gemini/) 1.0 Pro Vision on [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview). 

> Google offers different tools for different usages. Gemini comes with built-in chat applications for regular users, and [Google AI Studio](https://ai.google.dev/) is a tool for regular developers to use a family of Gemini models, and Generative AI on Vertex AI is for enterprise developers who want to leverage most of generative AI technologies built by Google.

At the time of writing this tutorial, accessing multimodal feature of Gemini via API is only supported on Vertex AI. Hence, the contents of thie tutorial are basically for Vertex AI users who want to try out Gemini's multimodality.

> You could try out multimodality on Google AI Studio's web interface though.

## The workflow of this tutorial

1. GCP authentication
2. Initializing Vertex AI session
3. Writing Python function to interact with Gemini 1.0 Pro Vision
4. Interacting with Gemini 1.0 Pro Vision (stream mode)
5. Interacting with Gemini 1.0 Pro Vision (non-stream mode)
6. Conclusion

{{< /step >}}

{{< step label="GCP authentication" duration="5:00" >}}

To use any service on [Google Cloud Platform](https://cloud.google.com/?hl=en)(GCP) including Vertex AI, authentication is always required. To do this, you need to install `gcloud` CLI toolkit. If you haven't yet, install it by following the instruction from [this page](https://cloud.google.com/sdk/docs/install)

If you are a Apple silicon macos user, you can simply follow the below (keep in mind that the future version of `gcloud` may be different from this tutorial):

```shell
# Download gcloud CLI toolkit
$ curl -L https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-466.0.0-darwin-arm.tar.gz -o google-cloud-cli-466.0.0-darwin-arm.tar.gz

# Decompress the tar.gz. You may want to 
# do this on a directory of your choice
$ tar -xvf google-cloud-cli-466.0.0-darwin-arm.tar.gz 

# Install gcloud CLI toolkit
$ ./google-cloud-sdk/install.sh
```

> If you try out this tutorial on [Google Colab](https://colab.research.google.com/) environment, `gcloud` CLI toolkit is pre-installed in it, so you don't need to install it by yourself.

Once `gcloud` CLI toolkit is installed correctly, run below to autheticate. When you run the following command, it gives you a link. Open it up on a browser, then grasp the generated key, then paste it into the terminal.

```shell
$ gcloud auth application-default login
```

While the above process works perfectly fine, we can't automate it since there is a interactive part of copy and paste stuffs. If that is what you are looking for, consider to run the following commands(it assumes you already have saved your service account key somewhere):

```shell
$ gcloud auth application-default login \
    --client-id-file=/path/to/your/service_account_key.json
```

{{< /step >}}

{{< step label="Initializing Vertex AI API" duration="5:00" >}}

The final step to get ready to use Gemini 1.0 Pro Vision is to initialize Vertex AI API. This is to updates common initialization parameters with provided options. If you are curious about what other parameters could be configured, check out the [official doc](https://cloud.google.com/python/docs/reference/aiplatform/latest/vertexai#vertexai_init). For the purpose of this tutorial, all we need is GCP project ID and GCP location.

To do that, run the following to install `google-cloud-aiplatform` PyPI package:

```shell
pip install --upgrade google-cloud-aiplatform
```

Then, import `vertexai` package and initialize Vertex AI API by using `vertexai.init` method. When calling `vertexai.init` method, pass your GCP project ID and GCP location such as `us-central1`. Those two information is all we need for this tutorial.

```python
import vertexai

GCP_PROJECT_ID="<YOUR-GCP-PROJECT-ID>"
GCP_LOCATION="<YOUR-CHOICE-OF-GCP-LOCATION>" # i.e. us-central1

vertexai.init(project=GCP_PROJECT_ID, location=GCP_LOCATION)
```

Now, we are all set to interact with Gemini 1.0 Pro Vision! In the next step, we are going to write a simple Python function to send message to Gemini 1.0 Pro Vision model.

{{< /step >}}

{{< step label="Writing Python function to interact with Gemini 1.0 Pro Vision" duration="10:00" >}}

To interact with Gemini 1.0 Pro Vision model on Vertex AI, we need to use `vertexai.generative_models` modules. Especially, we import two modules, `GenerativeModel` to specify the model type and `Part` to define a message to be sent to the model. In the below code snippet, `GenerationResponse` is imported to give type hint of the return value, so it is not mendatory to import it.

> For the sake of simplicity, I dropped the sanity checking code snippets to focus on the core business logic.

```python
from typing import Union, Iterable
from vertexai.generative_models import (
    GenerativeModel, GenerationResponse, Part
)

def _default_gen_config():
    return {
        "max_output_tokens": 2048,
        "temperature": 0.4,
        "top_p": 1,
        "top_k": 32
    }

def ask_gemini(
    prompt: str="What is in the video?", 
    video_gcs: str="gs://cloud-samples-data/video/animals.mp4", 
    gen_config: dict=_default_gen_config(),
    stream: bool=False, 
) -> Union[GenerationResponse, Iterable[GenerationResponse]]:

    vision_model = GenerativeModel("gemini-1.0-pro-vision")
    video = Part.from_uri(video_gcs, mime_type="video/mp4")

    return vision_model.generate_content(
        [video, prompt], 
        generation_config=gen_config, stream=stream
    )     
```

Here is what `ask_gemini()` function does in a nutshell without any explicit parameters:
- it basically asks Gemini 1.0 Pro Vision a question(`What is in the video?`) about the video hosted on Google Cloud Storage(`gs://cloud-samples-data/video/animals.mp4`).
- `GenerativeModel` is used to define which model to interact with. Here it is set to `gemini-1.0-pro-vision`. If you want to interact with just language model Gemini, you could simply switch to `gemini-1.0-pro`.
- `Part.from_uri` is used to define a special type of contents to be included in a message other than text. Unfortunately, when it comes to define a video content within `Part.from_uri`, the videos hosted on Google Cloud Storage is only allowed. We will see how to include a video on a local machine in the step 7.
- `vision_model.generate_content()` is a method that actually sends out a message to the model and receives back the results.
- `vision_model.generate_content()` returns a type of `GenerationResponse` when `stream=False`, or it returns a type of `Iterable[GenerationResponse]` when `stream=True`. We will see both usages in step 5 and 6.

Now, we have all the ingredients to play with Gemini 1.0 Pro Vision model!

{{< /step >}}

{{< step label="Interacting with Gemini 1.0 Pro Vision (stream mode)" duration="2:00" >}}

Now, let's ask gemini about the video hosted on Google Cloud Storage as below:

> Since the default value of `video_gcs` is already `gs://cloud-samples-data/video/animals.mp4`, we don't need to specify any parameter to `ask_gemini()` function. However, below code snippet set the value of`video_gcs` parameter to highlight what video we are going to analyze.

```python
response = ask_gemini(video_gcs="gs://cloud-samples-data/video/animals.mp4")
print(response)
```

Calling `ask_gemini()` function would take up to 1 minute (this could vary a bit though). Then, similar text as below is displayed out: 

```shell
 The video is an advertisement for the movie Zootopia. It features a sloth, a fox, and a rabbit taking selfies with a Google Pixel phone. The ad highlights the phone's camera quality and its ability to take great photos even in low-light conditions. The ad also features the tagline "See more at g.co/ZootopiaSelfies".
```

In UX perspective, waiting until the response text is fully generated isn't good because there is no feedback at all for about an minute. Is there a better way? Let's explore how we could get streamed intermediate results back in the next step.

{{< /step >}}

{{< step label="Interacting with Gemini 1.0 Pro Vision (non-stream mode)" duration="2:00" >}}

By passing `stream=True` to the `ask_gemini()` function, it returns a type of `Iterable[GenerationResponse]` back. As you could guess, nothing is different from when `stream=False` except the response is now iterable. How do we handle iterable? Using `for ... in` loop of course!

```python
responses = ask_gemini(gcs="gs://cloud-samples-data/video/animals.mp4", stream=True)

for resp in responses:
    print(resp.text, sep="\n\n")
```

> To get a natural output set `sep` parameter of `print` function to `""`. This tutorial set `sep=\n\n` to clearly show how response from each `GenerationResponse` is separated.

The above code snippet should print out two chunk of texts as similar as below:

```shell
It is a commercial for the movie Zootopia. It shows a sloth, a fox, and a rabbit in a city. It also shows a tiger,

 an elephant, and a seal. The animals are taking pictures of each other. The commercial is funny because it shows the animals doing human things.
```

{{< /step >}}

{{< step label="Send video contents on a local disk" duration="5:00" >}}

Last but not least, it is not ideal to upload video clip on the Google Cloud Storage all the time. Instead, it is more common to ask questions about video clips stored in your local system. Luckily, there is a way for this! To do this, we need to modify `ask_gemini` function to take additional `bytes` type parameter as below:

```python
import base64
from typing import Union, Iterable
from vertexai.generative_models import (
    GenerativeModel, GenerationResponse, Part
)

def ask_gemini(
    prompt: str="What is in the video?", 
    video_gcs: str="gs://cloud-samples-data/video/animals.mp4",
    base64_encoded: bytes=None,
    gen_config: dict=_default_gen_config(),
    stream: bool=False, 
) -> Union[GenerationResponse, Iterable[GenerationResponse]]:
    vision_model = GenerativeModel("gemini-1.0-pro-vision")

    if gcs is not None:
        video = Part.from_uri(gcs, mime_type="video/mp4")
    else:
        video = Part.from_data(
            data=base64_encoded, mime_type="video/mp4"
        )

    return vision_model.generate_content(
        [video, prompt], 
        generation_config=gen_config, stream=stream
    )
```

`vertexai.generative_models.Part` comes with the built-in class method `from_data()`, and this allows you to define a message with [based64 encoded](https://docs.python.org/3/library/base64.html#base64.b64encode) `bytes` type value. You can easily create base64 encoded bytes with the following code snippet:

```python
with open("animals.mp4", "rb") as video_file:
    video_data = video_file.read()

based64encoded_video = base64.b64encode(video_data)
```

Then, you are all set. Just call `ask_gemini` as below:

> The above code snippet assumes that you already have `animals.mp4` in the current directory. You can pass your own video clip, but if you want to get the same video clip, use `gsutil` CLI which is installed together when you install `gcloud` CLI toolkit. `gsutil cp gs://cloud-samples-data/video/animals.mp4 ./` command should download the sample video clip.

```python
response = ask_gemini(base64_encoded=based64encoded_video, video_gcs=None)
print(response)
```

{{< /step >}}

{{< step label="Conclusion" duration="2:00" >}}

We have gone through how to interact with Gemini 1.0 Pro Vision model to ask about a video clip.

Here are some takeaways:
- Always authenticate your GCP account to get access to Gemini models on Vertex AI.
- You can pass video clips stored in either on Google Cloud Storage or on your local machine. 
- For the video clips on Google Cloud Storage, use `Part.from_uri`.
- For the video clips on your local machine, use `Part.from_data` with base64 encoded video clips.
- Set `stream=True` if you want to get partially generated text in real time.
- For streaming mode, the returned value from `generate_content()` is iterable.

{{< /step >}}