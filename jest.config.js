module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/'
  ],
  coverageReporters: [
    'json-summary', 
    'text',
    'lcov'
  ],
};
