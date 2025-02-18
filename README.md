# @kong/eslint-config-kong-ui

A [shared ESLint configuration](https://eslint.org/docs/latest/extend/shareable-configs) for Kong's frontend repositories.

> [!Note]
> This package only supports ESLint flat config files and requires `eslint >= 9.0.0`.
>
> Beginning in ESLint v9.0.0, the default configuration system utilizes a new flat config system. See the [Migration Guide](https://eslint.org/docs/latest/extend/plugin-migration-flat-config) for more information.

- [Usage](#usage)
  - [Installation](#installation)
  - [Available Configs](#available-configs)
  - [Setup](#setup)
  - [Overriding settings from the shared config](#overriding-settings-from-the-shared-config)
  - [Apply a config to a subset of files](#apply-a-config-to-a-subset-of-files)
- [Contributing \& Local Development](#contributing--local-development)
  - [Lint and fix](#lint-and-fix)
  - [Committing Changes](#committing-changes)
  - [Approvals](#approvals)
  - [Package Publishing](#package-publishing)

## Usage

### Installation

Install the `@kong/eslint-config-kong-ui` package as a `devDependency` in your host project.

```sh
pnpm add -D @kong/eslint-config-kong-ui

# or for a mono repository, install to the workspace root
pnpm add -wD @kong/eslint-config-kong-ui
```

### Available Configs

This package exports several ESLint configurations to use in your project. Read through the available configs below, and see the [Setup](#setup) section for instructions on how to add them to your project.

#### Default config

The default config provides linting for files matching this pattern `**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts,vue}` and includes rules configured via:

- ESLint recommended rules
- TypeScript recommended rules
- `eslint-plugin-vue`
- `eslint-plugin-promise`
- [ESLint Stylistic](https://eslint.style/) rules configured for our preferred formatting settings
- ...and more. See [`index.mjs`](./configs/index.mjs) to view the configuration.

The default config can be imported as shown here:

```javascript
import eslintKongUiConfig from '@kong/eslint-config-kong-ui'
// or
import eslintKongUiConfig from '@kong/eslint-config-kong-ui/default'
```

#### JSON config

The JSON config provides linting for files matching this pattern `**/*.{json,jsonc}` and includes rules and preferred formatting settings configured via `eslint-plugin-jsonc`.

The JSON config can be imported as shown here:

```javascript
import eslintKongUiConfigJson from '@kong/eslint-config-kong-ui/json'
```

> [!Note]
> You will likely only want to apply the JSON config to a subset of file patterns in your project. See the section on [applying a config to a subset of files](#apply-a-config-to-a-subset-of-files) for detailed instructions.

#### Cypress config

The Cypress config includes all settings from the [Default config](#default-config) and provides additional rules for Cypress test files, given a pattern for `files` that your **host project provides**, and includes rules and preferred formatting settings configured via `eslint-plugin-cypress`, as well as the ESLint and TypeScript ESLint recommended settings. See [`cypress.mjs`](./configs/cypress.mjs) to view the configuration.

The Cypress config can be imported as shown here:

```javascript
import eslintKongUiConfigCypress from '@kong/eslint-config-kong-ui/cypress'
```

> [!Note]
> You will likely only want to apply the Cypress config to a subset of file patterns in your project. See the section on [applying a config to a subset of files](#apply-a-config-to-a-subset-of-files) for detailed instructions.

### Setup

To use the shared config, import the package inside of an `eslint.config.mjs` file and add it into the exported array, like this:

```javascript
// eslint.config.mjs
import eslintKongUiConfig from '@kong/eslint-config-kong-ui'

export default [
  ...eslintKongUiConfig,
]
```

### Overriding settings from the shared config

You can override settings from the shareable config by adding them directly into your `eslint.config.mjs` file after importing the shareable config. For example:

```javascript
// eslint.config.mjs
import eslintKongUiConfig from '@kong/eslint-config-kong-ui'

export default [
  ...eslintKongUiConfig,
  // anything from here will override eslintKongUiConfig
  {
    rules: {
        'no-unused-vars': 'error',
    }
  }
]
```

### Apply a config to a subset of files

You can [apply a config array to just a subset of files](https://eslint.org/docs/latest/use/configure/combine-configs#apply-a-config-object-to-a-subset-of-files) by using the `map()` method to add a `files` key to each config object.

For example, you may only want to apply the [JSON config](#json-config) to `**/locales/**/*.json` files in your project (this is our practice at Kong):

```javascript
// eslint.config.mjs
import eslintKongUiConfig from '@kong/eslint-config-kong-ui'
import eslintKongUiConfigJson from '@kong/eslint-config-kong-ui/json'
import eslintKongUiConfigCypress from '@kong/eslint-config-kong-ui/cypress'

export default [
  // Use the main config for all other files
  ...eslintKongUiConfig,
  // Only apply the shared JSON config to files that match the given pattern
  ...eslintKongUiConfigJson.map(config => ({
    ...config,
    files: ['**/locales/**/*.json']
  })),
  // Only apply the shared Cypress config to files that match the given pattern
  ...eslintKongUiConfigCypress.map(config => ({
    ...config,
    files: [
      '**/*.cy.ts',
      '**/cypress/**',
      'cypress/integration/**.spec.{js,ts,jsx,tsx}',
      'cypress/integration/**.cy.{js,ts,jsx,tsx}',
    ]
  })),
  // your modifications
  {
    rules: {
      'no-unused-vars': 'error',
    }
  }
]
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

### Approvals

- All pull requests require review and approval from authorized team members.
- Automated approvals through workflows are strictly prohibited.
  - There is an exception for automated pull request approvals originating from generated dependency updates that satisfy status checks and other requirements.
- Protected branches require at least one approval from code owners.
- All status checks must pass before a pull request may be merged.

### Package Publishing

This repository utilizes [Semantic Release](https://github.com/semantic-release/semantic-release) for automated package publishing and version updates.
