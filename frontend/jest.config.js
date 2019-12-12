module.exports = {
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!bootstrap-vue)'],
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**'
  ],
  coverageReporters: ['lcov'],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel'
};
