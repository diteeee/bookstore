module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(lucide-react|mongodb|bson)/)"
  ],
};
