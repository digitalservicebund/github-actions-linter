import linter from "../index"

test("Calling linter", () => {
  expect(() => linter(".")).not.toThrow()
})
