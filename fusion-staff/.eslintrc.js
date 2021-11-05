module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.8.6'
    }
  },
  parser: 'babel-eslint',
  rules: {
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',

    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 'off',

    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'camelcase': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    'eol-last': ['error', 'always'],
    'guard-for-in': 'off',
    'max-len': 'off',
    'no-bitwise': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'no-unused-expressions': ["error", { "allowTernary": true }],
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'prefer-destructuring': 'off',
    'semi': ['error', 'always'],
    'space-before-function-paren': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
