module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-bitwise': 'off',
  },
  plugins: ['solid'],
  extends: ['airbnb-base', 'plugin:solid/recommended'],
};
