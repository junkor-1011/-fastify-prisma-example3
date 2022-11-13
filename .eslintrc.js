// @ts-check
const { builtinModules } = require('node:module');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  rules: {
    'import/extensions': [
      2,
      {
        // js: 'never',
        // jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'always',
      },
    ],
  },
  overrides: [],
});
