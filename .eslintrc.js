module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'linebreak-style': [
      'error',
      'unix'
    ],
    'semi': [
      'error',
      'never'
    ],
    '@typescript-eslint/no-extra-semi': 'off',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/missing-preload': 'off',
  },
  'ignorePatterns': ['public/*.js'],
  'settings': {
    'import/resolver': {
      'alias': [
        ['app', './app'],
        ['models', './app/models'],
        ['components','./components'],
        ['pages','./pages'],
        ['plugins','./plugins'],
        ['server','./server'],
        ['services','./services'],
        ['site','./site'],
        ['site-v2','./site-v2'],
        ['styles','./styles'],
      ]
    }
  }
}
