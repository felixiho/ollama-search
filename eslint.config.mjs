import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/coverage/**",
      "**/.coverage/**",
      "**/jest*/**",
      "**/_test_/**",
      "**/__test__/**",
      "**/*.test.ts",
      "**/.umi/**",
      "**/.umi-production/**",
      "**/.umi-test/**",
      "**/.dumi/tmp*/**",
      "!**/.dumirc.ts",
      "**/dist/**",
      "**/es/**",
      "**/lib/**",
      "**/logs/**",
      "**/.next/**",
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
