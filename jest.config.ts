/**
 * Configuración de Jest para TypeScript en el monolito modular.
 * - Ejecuta tests en `backend/test`.
 * - Fuerza cobertura mínima global de 80%.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/backend/test"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx)"],
  moduleNameMapper: {
    "^backend/(.*)$": "<rootDir>/backend/$1",
    "^gateway/(.*)$": "<rootDir>/gateway/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "backend/src/**/*.ts",
    "backend/src/**/*.tsx",
    "!backend/src/**/infrastructure/**",
    "!backend/src/**/App.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ["text", "text-summary", "lcov"],
};

export default config;
