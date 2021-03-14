module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'node',
  projects: [
    '<rootDir>/apps/next-web',
    '<rootDir>/apps/express-server',
    '<rootDir>/libs/ddd-modules',
  ],
};
