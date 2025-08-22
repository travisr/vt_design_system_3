const { pathsToModuleNameMapper } = require('ts-jest');

// Read tsconfig.json manually to handle comments
const fs = require('fs');
const tsConfigContent = fs.readFileSync('./tsconfig.json', 'utf8');
// Remove comments from JSON
const cleanedContent = tsConfigContent.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
const { compilerOptions } = JSON.parse(cleanedContent);

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: 'tsconfig.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  collectCoverageFrom: [
    'projects/design-system/src/**/*.ts',
    'projects/demo/src/**/*.ts',
    '!projects/**/src/**/*.d.ts',
    '!projects/**/src/**/*.spec.ts',
    '!projects/**/src/**/index.ts',
    '!projects/**/src/test.ts',
    '!projects/**/src/main.ts',
    '!projects/**/src/polyfills.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/',
    }),
    '^@venntier/design-system$': '<rootDir>/projects/design-system/src/public-api.ts',
    '^@venntier/design-system/(.*)$': '<rootDir>/projects/design-system/src/$1',
  },
  testMatch: ['<rootDir>/projects/**/*.spec.ts', '<rootDir>/projects/**/*.test.ts'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@angular|@ngrx|ngx-)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/coverage/'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results',
        outputName: 'junit.xml',
      },
    ],
  ],
};
