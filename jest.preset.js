const nxPreset = require('@nx/jest/preset').default;

module.exports = { ...nxPreset, coverageReporters: ['html', 'lcov', 'text'] };
