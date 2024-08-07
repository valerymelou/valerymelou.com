const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  coverageReporters: ['html', 'lcov', 'text'],
  coveragePathIgnorePatterns: ['<rootDir>/libs/shared/ui-testing/*'],
};
