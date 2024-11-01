# Github Actions Linter

[![CI](https://github.com/digitalservicebund/github-actions-linter/actions/workflows/ci.yml/badge.svg)](https://github.com/digitalservicebund/github-actions-linter/actions/workflows/ci.yml)
[![version](https://img.shields.io/npm/v/gh-actions-linter.svg)](https://www.npmjs.com/package/gh-actions-linter)

Linting for GitHub Actions workflows:

- Detects referencing 3rd-party actions by mutable tags/references. The only actions allowed to be referenced in this way are actions created by GitHub itself.

```yml
# ❌ Bad
- name: Send status to Slack
  uses: lazy-actions/slatify@v3.0.0

- name: Send status to Slack
  uses: lazy-actions/slatify@main

# ✅ Good
- name: Send status to Slack
  uses: lazy-actions/slatify@c4847b8c84e3e8076fd3c42cc00517a10426ed65 # == v3.0.0
```

## Usage

Lint workflow files in `.github/workflows`:

```bash
npx --yes gh-actions-linter@v0.1.14
```

## Run locally

```bash
npx .
```

## Also available as a Github Action

```yml
name: CI

on:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: validate github workflow files to have pinned versions
        uses: digitalservicebund/github-actions-linter@LATEST_HASH
```

## Releasing

We use 👉 [release-it](https://www.npmjs.com/package/release-it)

Checklist:

- At first login to npmjs.com and make sure you have write access to the package
- Run `npm login` and follow the wizard
- Adapt the future semantic version in this README.md in section Usage
- Align the node version in `.node-version` with `action.yml` (It's recommended to use nodenv)
- Align the future semantic version in the `action.yml`
- Change whatever you like
- Make sure tests are green, linting is fine and format is checked: `npm run test && npm run lint:check && npm run format:check`
- Commit and Push your changes
- Finally run the interactive wizard `npm run release` which will automatically increase the semantic versioning in the `package.json`
