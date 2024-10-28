import { includeIgnoreFile } from "@eslint/compat"
import js from "@eslint/js"
import globals from "globals"
import { fileURLToPath, URL } from "node:url"
import jest from "eslint-plugin-jest"

export default [
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url))),

  // Basic rules
  js.configs.recommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
  {
    languageOptions: {
      globals: { ...globals.jest },
    },
    files: ["test/*.test.js"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
    },
  },
]
