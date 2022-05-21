module.exports = {
  ...require('@kurakichi/config/eslint-server'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json'],
  },
};
