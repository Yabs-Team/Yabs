module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/typescript'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'quotes': ['error', 'single'],
    'camelcase': 'error',
    'no-multiple-empty-lines': 'error',
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/typedef': [
      'error',
      {
        'arrowParameter': false,
        'explicit-function-return-type': true
      }
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
};
