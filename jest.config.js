const configBase = require('./jest.config-base');

module.exports = {
  ...configBase,
  collectCoverage: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: [
    '<rootDir>/src/**/*.(test|spec).ts',
    // '<rootDir>/test/unit/**/*.(test|spec).ts',
  ],
};
