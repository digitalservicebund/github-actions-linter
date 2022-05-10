// See https://github.com/import-js/eslint-plugin-import
const moduleImportRules = {
  "import/exports-last": 2,
  "import/first": 2,
  "import/newline-after-import": 2,
  "import/no-duplicates": 2,
  "import/order": [
    "error",
    {
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    },
  ],
}

module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  overrides: [
    {
      files: ["**/*.cjs"],
      extends: ["eslint:recommended"],
    },
    {
      files: ["**/*.js"],
      parserOptions: { sourceType: "module" },
      extends: ["eslint:recommended", "plugin:import/recommended"],
      rules: { ...moduleImportRules },
    },
  ],
}
