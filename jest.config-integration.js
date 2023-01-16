const configBase = require('./jest.config-base');

module.exports = {
  ...configBase,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: ['<rootDir>/test/integration/**/*.(test|spec).ts'],
};
