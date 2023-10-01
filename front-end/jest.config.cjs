module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
   
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/imageMock.js",
  }
};