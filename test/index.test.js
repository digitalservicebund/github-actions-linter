import linter from "../index"

test("Inacceptable branch reference", () => {
  expect(linter("./test/fixtures/branch.yml").length).toBe(1)
})

test("Inacceptable tag reference", () => {
  expect(linter("./test/fixtures/tag.yml").length).toBe(1)
})

test("Passing workflow", () => {
  console.log(linter("./test/fixtures/passing.yml"))
  // expect(linter("./test/fixtures/passing.yml").length).toBe(0)
})
