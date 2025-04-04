import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", 
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testMatch: ["**/src/**/*.test.ts", "**/src/**/*.test.tsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], 
};

export default config;
