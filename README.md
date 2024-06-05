# @kong/eslint-config-kong-ui

A [shared ESLint configuration](https://eslint.org/docs/latest/extend/shareable-configs) for Kong's frontend repositories.

> [!Note]
> This package only supports ESLint flat config files and requires `eslint >= 9.0.0`.
>
> Beginning in ESLint v9.0.0, the default configuration system utilizes a new flat config system. See the [Migration Guide](https://eslint.org/docs/latest/extend/plugin-migration-flat-config) for more information.

- [Usage](#usage)
  - [Installation](#installation)
- [Contributing \& Local Development](#contributing--local-development)
  - [Lint and fix](#lint-and-fix)
  - [Committing Changes](#committing-changes)
  - [Package Publishing](#package-publishing)

## Usage

### Installation

Install the `@kong/eslint-config-kong-ui` package as a `devDependency` in your host project.

```sh
pnpm add -D @kong/eslint-config-kong-ui

# or for a mono repository, install to the workspace root
pnpm add -wD @kong/eslint-config-kong-ui
```

## Contributing & Local Development

To get started, install the package dependencies

```sh
pnpm install
```

### Lint and fix

Lint package files, and optionally auto-fix detected issues.

```sh
# ESLint only
pnpm lint

# ESLint and fix
pnpm lint:fix
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This repo uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

[Commitizen](https://github.com/commitizen/cz-cli) and [Commitlint](https://github.com/conventional-changelog/commitlint) are used to help build and enforce commit messages.

It is **highly recommended** to use the following command in order to create your commits:

```sh
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.

#### Enforcing Commit Format

[Lefthook](https://github.com/evilmartians/lefthook) is used to manage Git Hooks within the repo.

- A `commit-msg` hook is automatically setup that enforces commit message stands with `commitlint`, see [`lefthook.ymal`](./lefthook.yaml)
- A `pre-push` hook is used that runs `eslint` before allowing you to push your changes to the repository

Additionally, CI will use `commitlint` to validate the commits associated with a PR in the `Lint Commit Messages` job.

### Package Publishing

This repository utilizes [Semantic Release](https://github.com/semantic-release/semantic-release) for automated package publishing and version updates.
