module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
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
    "import/prefer-default-export": 0,
    "no-plusplus": 0,
    "no-unused-vars": 0,
    "import/extensions": 0,
    "consistent-return": 0,
    "import/no-extraneous-dependencies": 0,
    "array-callback-return": 0,
  },
};
