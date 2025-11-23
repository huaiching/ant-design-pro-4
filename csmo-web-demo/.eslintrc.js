module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true
  },
  rules: {
    semi: [2, 'never'],
    quotes: [2, 'single', { avoidEscape: true }],
    camelcase: 2,
    'no-console': [2, { allow: ['info', 'warn', 'error'] }],
    'comma-dangle': [2, 'never'],
    '@typescript-eslint/consistent-type-imports': 0,
    camelcase: 0
  }
}
