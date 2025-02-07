const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.js ve .env dosyalarının bulunduğu konum
  dir: './',
});

// Jest için özel yapılandırma
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/services/(.*)$': '<rootDir>/services/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'services/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};

module.exports = createJestConfig(customJestConfig); 