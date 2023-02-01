/** @type {import('jest').Config} */
const config = {
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  preset: 'ts-jest/presets/default-esm',
  globalSetup: './jest.global-setup.cjs',
  moduleFileExtensions: ['js', 'cjs', 'ts', 'json'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
    // '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      // 'esbuild-jest',
      // {
      //   sourceMaps: true,
      //   format: 'esm',
      // },
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/'],
  verbose: true,
};

module.exports = config;
