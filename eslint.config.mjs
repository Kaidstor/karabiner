import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import importPlugin from 'eslint-plugin-import';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import tsLint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

// ignore git files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
  includeIgnoreFile(gitignorePath),
  ...tsLint.configs.recommended,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: 'module',
        project: 'tsconfig.json',
      },
    },
    plugins: {
      prettier,
      '@stylistic': stylistic,
      import: importPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      camelcase: 'off',
      'no-unsafe-finally': 'off',
      'import/no-named-as-default': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@stylistic/lines-between-class-members': ['error', 'always'],
      'max-classes-per-file': 'off',
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off',
      curly: ['error', 'all'],
      'import/prefer-default-export': 'off',
      'array-callback-return': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'no-return-await': 'off',
      'no-invalid-this': 'off',
      'no-empty-pattern': 'error',
      'no-magic-numbers': 'off',
      'object-shorthand': ['error', 'always'],
      'space-before-blocks': 'error',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
        },
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          ignoreEnums: true,
          ignoreArrayIndexes: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignore: [0, 1, -1, 2],
        },
      ],

      '@typescript-eslint/return-await': ['error', 'always'],
      'no-restricted-syntax': 'off',

      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'off',

      'import/no-cycle': [
        'error',
        {
          maxDepth: 10,
          ignoreExternal: true,
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['src/'],
          commonjs: true,
          amd: true,
          caseSensitiveStrict: true,
          caseSensitive: true,
        },
      ],
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
];
