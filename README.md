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
npx --yes gh-actions-linter@v0.1.8
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
        uses: digitalservicebund/github-actions/github-actions-linter@33695c875c198153e136ed0b99e06962e7fee0af
```

## Releasing

👉 [release-it](https://www.npmjs.com/package/release-it)

Start a dry run to see what would happen:

```bash
npm run release minor -- --dry-run
```

Do a real release (publishes to npm):

```bash
npm run release minor
```
