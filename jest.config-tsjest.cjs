const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
const unitTestConfig = {
  collectCoverage: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: [
    '<rootDir>/src/**/*.(test|spec).ts',
    // '<rootDir>/test/unit/**/*.(test|spec).ts',
  ],
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
const integrationTestConfig = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: ['<rootDir>/test/integration/**/*.(test|spec).ts'],
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
const baseConfig = {
  resolver: 'ts-jest-resolver',
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  globalSetup: './jest.global-setup.cjs',
  moduleFileExtensions: ['js', 'cjs', 'ts', 'json'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/'],
  verbose: true,
};

const config =
  process.env.TEST_TARGET === 'integration'
    ? { ...baseConfig, ...integrationTestConfig }
    : { ...baseConfig, ...unitTestConfig };

module.exports = config;
