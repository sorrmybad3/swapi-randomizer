/** @type {import('ts-jest').JestConfigWithTsJest} **/
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
