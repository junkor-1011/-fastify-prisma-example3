/** @type {import('jest').Config} */
const configBase = require('./jest.config-base.cjs');

/** @type {import('jest').Config} */
const config = {
  ...configBase,
  collectCoverage: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: [
    '<rootDir>/src/**/*.(test|spec).ts',
    // '<rootDir>/test/unit/**/*.(test|spec).ts',
  ],
};

module.exports = config;
