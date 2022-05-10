import assert from "assert"
import fs from "fs"
import glob from "glob"
import YAML from "yamljs"

export default (root) =>
  glob
    .sync(`${root}/**/*.yml`)
    .map((path) => fs.readFileSync(path, "utf8"))
    .map((content) => YAML.parse(content))
    .filter((content) => content && content.hasOwnProperty("jobs"))
    .flatMap((yaml) => yaml.jobs)
    .map((jobs) => {
      for (let key of Object.keys(jobs)) {
        return jobs[key]
      }
    })
    .flatMap((job) => job.steps)
    .filter((step) => step && step.hasOwnProperty("uses"))
    .map((step) => step.uses)
    .filter((uses) => !uses.startsWith("actions/"))
    .map((uses) => {
      if (
        uses.split("@").length !== 2 ||
        uses.split("@")[1].search(/[a-z0-9]{40}$/) === -1
      ) {
        return `${uses} should use a commit hash as a version identifier`
      }
    })
    .filter((found) => found)
