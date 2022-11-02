/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
    {
      files: ["**/*.js"],
      rules: {
        'comma-dangle': ['error', 'only-multiline'],
        'semi': ['error', 'always'],
      }
    },
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
      rules: {
        '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
        'semi': 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/array-type': ['error', {default: 'array-simple'}],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/strict-boolean-expressions': ['error', {
          allowNullableBoolean: true,
          allowNullableString: true,
          allowNullableObject: true,
        }]
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      'tsconfig.json',
      'plugins/tsconfig.json'
    ],
  },
  plugins: [
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/display-name': ['warn'],
    'react/prop-types': ['error', {
      skipUndeclared: true,
    }],
  }
};
