module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: 'off',
    indent: ['error', 2],
    'space-in-parens': 'off',
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
