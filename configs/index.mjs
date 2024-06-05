import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

// Compatibility utils
import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'
const compat = new FlatCompat()

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  // See here for compatibility: https://github.com/eslint-community/eslint-plugin-promise/issues/449#issuecomment-2108572139
  ...fixupConfigRules(
    compat.config({
      extends: ['plugin:promise/recommended'],
    }),
  ),
  ...compat.config({
    extends: ['plugin:cypress/recommended'],
  }),
  // Global ignores
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/public/',
      '**/bin/',
      '**/.nuxt/',
      '**/.output/',
      '**/.wrangler/',
    ],
  },
  {
    files: [
      '**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts,vue}',
    ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals['shared-node-browser'],
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    ignores: [
      '**/locales/**/*.json',
    ],
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single', {
        avoidEscape: true,
      }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      // Ensures ESLint understands that `defineEmits<{ ... }>()` does _not_ fail this rule.
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/array-bracket-spacing': ['error', 'never', {
        singleValue: false,
        objectsInArrays: false,
      }],
      '@stylistic/object-curly-spacing': ['error', 'always', {
        arraysInObjects: true,
        objectsInObjects: true,
      }],
      '@stylistic/padded-blocks': 'off',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/keyword-spacing': ['error', {
        before: true,
        after: true,
      }],
      'no-unused-vars': 'off',
      camelcase: 'off',
      'no-console': 'off',
      'no-debugger': 'warn',
      'promise/always-return': ['error', {
        ignoreLastCallback: true,
      }],
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/attributes-order': ['error', {
        alphabetical: true,
      }],
      'vue/multiline-html-element-content-newline': ['error', {
        ignoreWhenEmpty: true,
        ignores: ['code', 'pre', 'textarea', 'a', 'span', 'router-link'],
      }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      }],
      '@typescript-eslint/ban-ts-comment': ['warn', {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        minimumDescriptionLength: 10,
      }],
      'vue/no-restricted-static-attribute': ['error',
        {
          key: 'data-test-id',
          message: 'Using "data-test-id" is not allowed. Use "data-testid" instead.',
        },
        {
          key: 'data-tracking-id',
          message: 'Using "data-tracking-id" is not allowed. Use "data-testid" instead.',
        },
      ],
      'vue/no-restricted-v-bind': ['error',
        {
          argument: 'data-test-id',
          message: 'Using "data-test-id" is not allowed. Use "data-testid" instead.',
        },
        {
          argument: 'data-tracking-id',
          message: 'Using "data-tracking-id" is not allowed. Use "data-testid" instead.',
        },
      ],
    },
  },
  {
    files: [
      '**/*.cy.ts',
      '**/cypress/**',
    ],
    rules: {
      'promise/always-return': 'off',
      'promise/catch-or-return': 'off',
      'promise/no-nesting': 'off',
    },
  },
  {
    files: [
      'cypress/integration/**.spec.{js,ts,jsx,tsx}',
      'cypress/integration/**.cy.{js,ts,jsx,tsx}',
    ],
    ...compat.config({
      extends: ['plugin:cypress/recommended'],
    }),
  },
]
