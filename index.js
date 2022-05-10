import assert from "assert"
import fs from "fs"
import glob from "glob"
import YAML from "yamljs"

export default (pattern) =>
  glob
    .sync(pattern)
    .map((path) => fs.readFileSync(path, "utf8"))
    .map((content) => YAML.parse(content))
    .filter((content) => content.hasOwnProperty("jobs"))
    .map((yaml) => yaml.jobs)
    .flatMap((jobs) => Object.values(jobs))
    .flatMap((job) => job.steps)
    .filter((step) => step.hasOwnProperty("uses"))
    .map((step) => step.uses)
    .filter((uses) => !uses.startsWith("actions/"))
    .reduce((accumulator, uses) => {
      if (
        uses.split("@").length !== 2 ||
        uses.split("@")[1].search(/[a-z0-9]{40}$/) === -1
      ) {
        accumulator.push(
          `${uses} should use a commit hash as a version identifier`
        )
      }
      return accumulator
    }, [])
