/**
 * Configuración base de ESLint para monorepo TS/JS con React y Prettier.
 */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2021,
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "import", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      { allowExpressions: true },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["backend/src/**/*.ts", "gateway/**/*.ts"],
      rules: { "react/jsx-filename-extension": "off" },
    },
  ],
};
