const tsconfig = require("./tsconfig.json")
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig)

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  //testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  testMatch: [
    "/**/*.spec.ts"
  ],
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest',
  // },
  reporters: ["default"],
  setupFilesAfterEnv: ["jest-extended"],
  moduleNameMapper,
};
