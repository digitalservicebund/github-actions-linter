import linter from "../index"

test("Calling linter", () => {
  expect(linter("./test/fixtures/**/*.yml")).toContain(
    "crazy-max/ghaction-github-pages@v2 should use a commit hash as a version identifier",
    "crazy-max/ghaction-github-pages@latest should use a commit hash as a version identifier"
  )
})
