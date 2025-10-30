const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  // Transforma arquivos TS e templates HTML
  transform: {
    '^.+\\.(ts|mjs|html|js)$': 'jest-preset-angular',
  },

  // Ignora transformações de dependências específicas
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)'
  ],

  // Faz Jest entender imports como src/ ou @app/
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy', // ignora estilos
    '\\.(html)$': '<rootDir>/__mocks__/htmlMock.js', // ignora HTML externo
  },

  testEnvironment: 'jsdom',

  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
};
