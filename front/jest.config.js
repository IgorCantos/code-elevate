module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // se estiver usando imports absolutos
  },
};
