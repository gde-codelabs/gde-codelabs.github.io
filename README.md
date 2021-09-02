[![CI](https://github.com/gde-codelabs/gde-codelabs.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/gde-codelabs/gde-codelabs.github.io/actions/workflows/ci.yml)

# Codelabs built by GDEs

This repository builds static web pages using Hugo, and the generated static web pages are hosted on GitHub Pages. The applied theme makes the appearance of the pages similar to [google codelabs](https://codelabs.developers.google.com/). This Hugo theme was originally ported by [nekocode](https://github.com/nekocode/codelabs-hugo-theme), and customized by [Chansung Park](https://github.com/deep-diver/codelabs-hugo-theme).

# Guide

## How to contribute as a writer

1. Install Hugo ([instructions](https://gohugo.io/getting-started/installing/))
2. Run `git submodule update --init exampleSite/themes/codelabs/`
3. Run `git submodule foreach git pull origin master`
4. Write a post under `exampleSite/content/posts` directory
    - You can follow the [format guide](https://github.com/googlecodelabs/tools). However, since this is not the actual Codelabs, you have to check locally if the features are supported
4. Run `hugo server -D` in `exampleSite` for local test
    - You don't have to kill and run this process whenever you add more contents. You can see the reflected changes if you refresh the browser
5. Commit & Pull Request

#### In case of using GitHub Codespace

1. Skip the first step above since Hugo is preinstalled
2. Run `hugo server -D --baseUrl=/ --appendPort=false` for local test instead
