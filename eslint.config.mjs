import { includeIgnoreFile } from "@eslint/compat"
import js from "@eslint/js"
import globals from "globals"
import { fileURLToPath, URL } from "node:url"
import jest from "eslint-plugin-jest"

export default [
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url))),
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
    files: ["test/*.test.js"],
    plugins: { jest: jest },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
  },
]
