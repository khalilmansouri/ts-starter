const tsconfig = require("./tsconfig.json")
import type { Config } from "@jest/types"
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig)

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  testMatch: [
    "/**/*.spec.ts"
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  reporters: ["default"],
  setupFilesAfterEnv: ["jest-extended"],
  moduleNameMapper,
}

export default config;

// const tsconfig = require("./tsconfig.json")
// const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig)
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   // coverageThreshold: {
//   //   global: {
//   //     branches: 80,
//   //     functions: 80,
//   //     lines: 80,
//   //     statements: 80,
//   //   },
//   // },
//   moduleDirectories: ['node_modules', 'src'],
//   testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
//   testMatch: [
//     "/**/*.spec.ts"
//   ],
//   transform: {
//     '^.+\\.ts?$': 'ts-jest',
//   },
//   reporters: ["default"],
//   setupFilesAfterEnv: ["jest-extended"],
//   moduleNameMapper,
// }
// export default config;