/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  // preset: 'ts-jest/presets/default-esm',
  // globals: {
  //   '@swc/jest': {
  //     tsconfig: '<rootDir>/tsconfig.json',
  //   },
  // },
  globalSetup: './jest.global-setup.cjs',
  moduleFileExtensions: ['js', 'cjs', 'ts', 'json'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // '^axios$': require.resolve('axios'),
  },
  // testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  // testEnvironment: 'jest-environment-jsdom',
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
    // '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    // '^.+\\.module\\.(css|sass|scss)$',
  ],
  verbose: true,
};

module.exports = config;
