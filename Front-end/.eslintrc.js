module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@html-eslint/no-duplicate-id': 'error',
    '@html-eslint/require-li-container': 'error',
    '@html-eslint/no-obsolete-tags': 'error',
    '@html-eslint/no-duplicate-attrs': 'error',
    '@html-eslint/require-button-type': 'error',
    '@html-eslint/no-multiple-h1': 'error',
    '@html-eslint/no-target-blank': 'error',
    '@html-eslint/require-img-alt': 'error',
    '@html-eslint/no-skip-heading-levels': 'error',
    '@html-eslint/require-closing-tags': ['error', { selfClosing: 'always' }],
    '@html-eslint/no-extra-spacing-attrs': [
      'error',
      { enforceBeforeSelfClose: true },
    ],
  },
  plugins: ['@html-eslint'],
  overrides: [
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
    },
  ],
};
