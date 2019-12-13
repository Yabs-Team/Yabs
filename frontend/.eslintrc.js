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
    'quotes': ['warn', 'single'],
    'camelcase': 'warn',
    'no-multiple-empty-lines': 'warn',
    'indent': 'off',
    '@typescript-eslint/indent': ['warn', 2],
    '@typescript-eslint/semi': ['warn', 'always'],
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/typedef': [
      'warn',
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
