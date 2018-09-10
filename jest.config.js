module.exports = {
  coverageReporters: ['lcov', 'html'],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '<rootDir>/(tests/**/*.spec.js|**/__tests__/*.js)'
  ]
}
