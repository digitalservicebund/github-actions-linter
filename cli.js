#! /usr/bin/env node

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import chalk from "chalk"
import linter from "./index.js"
const argv = yargs(hideBin(process.argv)).argv
let workflowPath = "./.github/workflows/"

if (argv.path) {
  console.log(chalk.blue(`Looking for workflows in ${argv.path}`))
  workflowPath = argv.path
}
try {
  const result = linter(workflowPath)
  if (result.length > 0) {
    console.log(chalk.red(`Found issues in github workflows`))
    console.log(chalk.red(result.join("\n")))
    process.exit(result.length)
  } else {
    console.log(chalk.green(`No issues found in github workflows`))
    process.exit(0)
  }
} catch (err) {
  console.log(chalk.red(`${err.message}`))
}
