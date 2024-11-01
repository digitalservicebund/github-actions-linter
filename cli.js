#!/usr/bin/env node

import chalk from "chalk"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import linter from "./index.js"

const argv = yargs(hideBin(process.argv)).argv
const workflowsPattern = argv.path || "./.github/workflows/**/*.yml"

try {
  console.log(
    chalk.blue(`Looking for workflows with pattern ${workflowsPattern}`),
  )
  const result = linter(workflowsPattern)
  if (result.length > 0) {
    console.log(chalk.red("Found issues in workflow files"))
    console.log(chalk.red(result.join("\n")))
    process.exit(result.length)
  } else {
    console.log(chalk.green("No issues found in workflow files"))
    process.exit(0)
  }
} catch (err) {
  console.log(chalk.red(`${err.message}`))
}
