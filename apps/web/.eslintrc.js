module.exports = {
  ...require('config/eslint-web.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}