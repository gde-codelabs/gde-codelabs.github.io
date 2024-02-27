---
title: Introduction to HuggingFace
date: 2024-02-28
categories: [huggingface]
tags: [HuggingFace]
duration: 285:00
authors: Chansung Park
---

{{< step label="Overview" duration="1:00" >}}

This codelab shows you how to build a CPU optimized custom TensorFlow Serving Docker image with your own TensorFlow model. With this, you will have a better performant TensorFlow deployment depending on the currently available CPU platform. asdf

## **What you'll learn**
- How to build CPU optimized TensorFlow Core Docker image
- How to build custom TF Serving Docker image
- How to modify the TF Serving Docker image to have a custom TensorFlow model
- How to push the custom TF Serving Docker image to GCR(Google Cloud Registry) 

## **What you'll need**
- Machine to deploye TF Serving

{{< /step >}}

{{< step label="Install Docker" duration=9:00" >}}

[TF Serving repository](https://github.com/tensorflow/serving) provides a easy-to-use tool to build both custom TensorFlow Core and TF Serving Docker images out of the box, and the tool leverages [Docker](https://www.docker.com/) technology under the hood. So you need to install Docker in the system where you want to deploy [TF Serving](https://www.tensorflow.org/tfx/guide/serving). 

Below shows how to install Docker on Ubuntu. The official guide for the other OSes can be found [here](https://docs.docker.com/engine/install/).

```
$ sudo apt update

$ sudo apt install docker.io
```

After the installation succeeds, it creates a user group called `docker`. You need to make the current user to be one of the `docker` member. Otherwise, you will need `sudo` whenever you run [`docker`](https://docs.docker.com/engine/reference/commandline/cli/) command later, and that is not the recommended way.

Below shows how to put the current user(`$USER`) into the `docker` group. Linux command [`usermod`](https://linux.die.net/man/8/usermod) modifies designated user account. `-a` option means **append**, and `-G` option means **group**. So it basically means to append [`$USER`](https://man7.org/linux/man-pages/man1/login.1.html) to the group `docker`.

```
$ sudo usermod -aG docker $USER
```

{{< /step >}}

{{< step label="Clone TF Serving Repository" duration=5:00" >}}

After having Docker in your local system successfully, you need to clone the repository of TF Serving because it comes with a set of nice tools and scripts to build a (CPU optimized) custom Docker image. 

Below shows how to clone the repository of TF Serving. And everything afterwards basically will happen inside the root of the repository.

```
$ git clone https://github.com/tensorflow/serving.git

$ cd serving
```

{{< /step >}}

{{< step label="Build TensorFlow Core Docker Image" duration=240:00" >}}

We use [`run_in_docker.sh`](https://github.com/tensorflow/serving/blob/master/tools/run_in_docker.sh) script under `tools` directory to build a custom TensorFlow Core Docker image. [`bazel`](https://bazel.build/) is used under the hood, but you don't need to install it in your system. Docker provides a completely isolated environment, so `run_in_docker.sh` provides everything inside a fresh environment.

Run the `run_in_docker.sh` script with the options exactly the same as below. [`--copt=-march=native`](https://github.com/tensorflow/serving/blob/2b20315418346837a26a11f640fed0da90048a08/tensorflow_serving/g3doc/setup.md#optimized-build) automatically figures out which instruction sets are available on the current CPU architecture, and [`--copt=-Wno-error=maybe-uninitialized`](https://github.com/tensorflow/serving/issues/1642#issuecomment-770832441) option allows ingnoring warnings occured by `uninitialized variable`. This happens if there is a sort of failure after the static analysis of the codebase, but the it is recognized as a critical failure, so it stops the building process.

```
$ tools/run_in_docker.sh bazel build \
    --config=nativeopt \
    --copt=-march=native \
    --copt=-Wno-error=maybe-uninitialized \
    tensorflow_serving/...
```

It will take about 3 to 4 hours to build successfully. After being successfully, run [`docker images`](https://docs.docker.com/engine/reference/commandline/image/) command like below, then you will see newly built Docker image named `tensorflow/serving` and tagged as `nightly-devel`.

```
$ docker images
```

{{< /step >}}

{{< step label="Build TF Serving Docker Image" duration=10:00" >}}

With the custom built Docker image of TensorFlow Core, now you can build a custom TF Serving Docker image by leveraging the TensorFlow Core under the hood. In order to do that, you need a [`Dockerfile`](https://docs.docker.com/engine/reference/builder/). 

Fortunately, the repository of TF Serving already provides the [`Dockerfile`](https://github.com/tensorflow/serving/blob/master/tensorflow_serving/tools/docker/Dockerfile) in `tensorflow_serving/tools/docker` directory for this purpose, so go into that folder.

```
$ cd tensorflow_serving/tools/docker
```

There are a number of `Dockerfile`s, but you need the one exactly named as `Dockerfile`. Open it up with your favorite IDE, update the value of `TF_SERVING_VERSION` variable to `nightly`. This means we are going to use the newly built Docker image from the previous step. 

Then you can build your own custom TF Serving Docker image using the [`docker build`](https://docs.docker.com/engine/reference/commandline/build/) command like below. Update `<IMAGE_NAME_TO_BUILD>` and `<TAG_NAME>` with the appropriate strings.

```
$ docker build -t <IMAGE_NAME_TO_BUILD>:<TAG_NAME> -f Dockerfile .
```

After successfully building the custom TF Serving Docker image, you will see it listed by running [`docker images`](https://docs.docker.com/engine/reference/commandline/image/) command.

```
$ docker images
```

{{< /step >}}

{{< step label="Embed Custom TensorFlow Model" duration=10:00" >}}

Now it is time to insert TensorFlow model into the TF Serving Docker image so you can deploy the model with the endpoints of REST and gRPC. In order to do that, we first need to run the base TF Serving Docker image with [`docker run`](https://docs.docker.com/engine/reference/run/) command like below. `--name serving_base` option gives the running Docker container a name of `serving_base`. `-d` option lets the Docker container run in background mode.

```
$ docker run -d --name serving_base \
    <IMAGE_NAME_TO_BUILD>:<TAG_NAME>
```

Next step is to copy the [SavedModel](https://www.tensorflow.org/guide/saved_model) from local file system to the running Docker container under `/models/`. This can be done with [`docker cp`](https://docs.docker.com/engine/reference/commandline/cp/) command. Also we are assuming there is a parent folder of the SavedModel, and it should be named as integer(version information). For instance, under `1/` directory, you can put SavedModel in it. 

```
$ docker cp <WHERE_TF_MODEL_IS_STORED> \ 
    serving_base:/models/<MODEL_NAME>
```

We made changes to the running Docker container, but it will be gone if we instantiate a Docker container from the image again. So, we need to commit that changes and makes a new Docker image based on that. This can be done with [`docker commit`](https://docs.docker.com/engine/reference/commandline/commit/) command.

```
$ docker commit --change "ENV MODEL_NAME <MODEL_NAME>" \ 
    serving_base <NEW_IMAGE_NAME>:<NEW_TAG>
```

After this, when you run [`docker images`](https://docs.docker.com/engine/reference/commandline/image/) command, you will see a Docker image named `<NEW_IMAGE_NAME>:<NEW_TAG>`.

{{< /step >}}

{{< step label="(Optional) Push the Docker Image to GCR" duration=10:00" >}}

Now, you have a fully working CPU optimized custom TF Serving Docker image for your own TensorFlow model. However, it is commonly good idea to push the image to the cloud such as Docker Hub or Google Cloud Registry(GCR). In this optional step, you will learn how to push a Docker image to GCR. 

First, you need [`gcloud`](https://cloud.google.com/sdk/gcloud) command line CLI tool to authenticate, access to services from Google Cloud Platform. Below shows how to download files to install `gcloud` CLI tool. The version is constantly updated, so please check out the newest version from [here](https://cloud.google.com/sdk/docs/install)

```
$ SOURCE_FILENAME=google-cloud-cli-393.0.0-linux-x86_64.tar.gz
$ TARGET_FILENAME=gcloud_cli.tar.gz

$ curl "https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/$SOURCE_FILENAME" \ 
    > $TARGET_FILENAME

$ tar -xf gcloud_cli.tar.gz
```

After downloading and extracting the `gcloud_cli.tar.gz` file, the extracted contents will be placed under `google-cloud-sdk` directory. And run `install.sh` script under `google-cloud-sdk/bin` directory to install `gcloud` CLI tool.

```
$ google-cloud-sdk/bin/install.sh
```

Besides the `gcloud` CLI tool itself, you also need to install additional component `docker-credential-gcr` by using `gcloud components install` command. This will make `docker` command compatible with GCR. It means you can push locally built Docker image to GCR with `docker` command. 

```
$ gcloud components install docker-credential-gcr
```

After the installation is complete, you need to log in and authenticate with a [Service Account](https://cloud.google.com/iam/docs/service-accounts). Logging in process can be done with [`gcloud auth login`](https://cloud.google.com/sdk/gcloud/reference/auth/login) command. It will pop-up a new tab on the browser, and copy and paste the tokens appeared in the browser to the terminal. [`gcloud auth activate-service-account`](https://cloud.google.com/sdk/gcloud/reference/auth/activate-service-account) command lets you to activate a certain Service Account by specifying the associated [key file(JSON)](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) in `--key-file` option. Please note that the Service Account should have appropriate permissions to the Google Cloud Storage. Refer this [document](https://cloud.google.com/container-registry/docs/access-control) for the detailed descriptions about the permission. 

```
$ gcloud auth login
$ gcloud auth activate-service-account <SA_ACCOUNT> --key-file=<KEY_FILE>
$ gcloud config set project <GCP_PROJECT_ID>
```

You can push a Docker image to GCR with [`docker push`](https://docs.docker.com/engine/reference/commandline/push/) command, and `docker` command only knows where to push by looking up the prefix of the name. So, we need to rename the Docker image with a certain format of `gcr.io/<GCP_PROJECT_ID>/<NEW_IMAGE_NAME>:<NEW_TAG>`, and the renaming can be done with `docker tag` command like below.

```
$ docker tag <NEW_IMAGE_NAME>:<NEW_TAG> \
    gcr.io/<GCP_PROJECT_ID>/<NEW_IMAGE_NAME>:<NEW_TAG>
```

As the final step, you can run `docker push` command to push the Docker image to GCR. 

```
$ docker push gcr.io/<GCP_PROJECT_ID>/<NEW_IMAGE_NAME>:<NEW_TAG>
```

{{< /step >}}

