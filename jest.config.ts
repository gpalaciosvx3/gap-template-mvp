import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/backend/test'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx)', '**/*.steps.ts'],
  moduleNameMapper: {
    '^backend/(.*)$': '<rootDir>/backend/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'backend/src/**/*.ts',
    'backend/src/**/*.tsx',
    '!backend/src/**/infrastructure/**',
    '!backend/src/**/App.tsx',
    '!backend/src/**/application/dto/**',
    '!backend/src/**/dto/**',
    '!backend/src/**/domain/entities/**',
    '!backend/src/**/domain/repositories/**',
    '!backend/src/**/types/**',
    '!backend/src/**/mappers/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'text-summary', 'lcov'],
};

export default config;
