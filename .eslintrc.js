module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "no-console": 0,
    "quotes": 0,
    "quote-props": 0,
    "class-methods-use-this": 0,
    "import/first": 0,
    "no-param-reassign": 0,
    "no-empty-function": 0,
    "camelcase": 0,
  },
};
