import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import n from "eslint-plugin-n";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", "coverage/", "types/vitest.d.ts"] },
  {
    files: ["**/*.ts"],
    extends: [
      js.configs.recommended,
      n.configs["flat/recommended"],
      jest.configs["flat/recommended"],
      tseslint.configs.recommended,
      prettierRecommended,
    ],
    languageOptions: {
      parserOptions: { project: "./tsconfig.json" },
    },
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "@typescript-eslint/no-namespace": 0,
      "n/no-unsupported-features/es-syntax": 0,
      "n/no-unpublished-import": 0,
      // tsc already checks imports; eslint-plugin-n can't resolve `../src` to index.ts
      "n/no-missing-import": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-non-null-assertion": 0,
      "@typescript-eslint/no-use-before-define": 0,
      "@typescript-eslint/no-unused-vars": [2, { ignoreRestSiblings: true }],
      "@typescript-eslint/no-floating-promises": 2,
      "@typescript-eslint/no-require-imports": 2,
      "no-empty-pattern": 0,
      "no-console": 2,
      "simple-import-sort/imports": 2,
    },
  },
);
