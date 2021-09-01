[![CI](https://github.com/gde-codelabs/gde-codelabs.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/gde-codelabs/gde-codelabs.github.io/actions/workflows/ci.yml)

Here is what you can do to add a tutorial:

1. Install `hugo` ([instructions](https://gohugo.io/getting-started/installing/))
2. Clone the repo with `--recursive` to get submodules
3. Write posts under `exampleSite/content/posts` (you can follow this [guide](https://github.com/googlecodelabs/tools))
4. Run `hugo server -D` in `exampleSite` for local test
5. Commit & open PR 

You can use GitHub Codespaces as well:

1. Open up a codespace on this repository (`<>Code` on the top right => `Codespaces` tab => `New codespace`). If this option
   is not available on your end simply press the "." key from your keyboard while being on the homepage of this repository.
3. Open up the terminal interface in Codespace(`three lines icon` on the top left => `Terminal` => `New Terminal`)
4. Update the submodules with `git submodule update --init exampleSite/themes/codelabs/`
5. Write posts under `exampleSite/content/posts`
6. Run `hugo server -D --baseUrl=/ --appendPort=false` in `exampleSite` for local test
7. Commit & open PR
