import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'jsdom', // Simulates a browser environment for tests
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.ts'], // Setup file for testing utilities
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Transform JSX files
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/src/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!(lucide-react)/)'],
  testPathIgnorePatterns: ["<rootDir>/jest.setup.ts"]
};

export default config;
