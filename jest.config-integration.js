/** @type {import('jest').Config} */
const configBase = require('./jest.config-base');

/** @type {import('jest').Config} */
const config = {
  ...configBase,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: ['<rootDir>/test/integration/**/*.(test|spec).ts'],
};

module.exports = config;
