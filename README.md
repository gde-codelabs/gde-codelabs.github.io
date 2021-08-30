[![CI](https://github.com/gde-codelabs/gde-codelabs.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/gde-codelabs/gde-codelabs.github.io/actions/workflows/ci.yml)

Here is what you can do to add a tutorial:

1. install `hugo` ([instructions](https://gohugo.io/getting-started/installing/))
2. clone the repo with `--recursive` to get submodules
3. write posts under `exampleSite/content/posts` ([guide](https://github.com/googlecodelabs/tools))
4. run `hugo server -D` in `exampleSite` for local test
5. commit & open PR 

You can use GitHub codespace as well:

1. open up a codespace on this repository (`<>Code` on the top right => `Codespaces` tab => `New codespace` )
2. open up the terminal interface in Codespace(`three lines icon` on the top left => `Terminal` => `New Terminal`)
3. update the submodules with `git submodule update --init exampleSite/themes/codelabs/`
4. write posts under `exampleSite/content/posts`
5. run `hugo server -D --baseUrl=/ --appendPort=false` in `exampleSite` for local test
6. commit & open PR