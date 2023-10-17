import fs from "fs"
import { glob } from "glob"
import YAML from "yamljs"

export default (pattern) =>
  glob
    .sync(pattern)
    .map((path) => fs.readFileSync(path, "utf8"))
    .map((content) => YAML.parse(content))
    .filter((content) => Object.prototype.hasOwnProperty.call(content, "jobs"))
    .map((yaml) => yaml.jobs)
    .flatMap((jobs) => Object.values(jobs))
    .flatMap((job) => job.steps)
    .filter((step) => Object.prototype.hasOwnProperty.call(step, "uses"))
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
