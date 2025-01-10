module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'linebreak-style': 0,
    'global-require': 0,
    'default-param-last': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': ['error', { variables: false }],
    'react/style-prop-object': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'eslint-disable-next-line no-await-in-loop': 'off',
    'eslint-disable-next-line no-param-reassign': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': ['error', { allow: ['_source', '_id'] }],
    'no-await-in-loop': 0,
    'no-constant-condition': 0,
  },
};
