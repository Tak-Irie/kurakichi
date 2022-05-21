module.exports = {
  ...require('@kurakichi/config/eslint-web.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
