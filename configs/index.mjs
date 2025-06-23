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
  // Global ignores
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/public/',
      '**/bin/',
      '**/.nuxt/',
      '**/.output/',
      '**/.wrangler/',
      '**/.vitepress/cache/',
      '**/playwright-report/',
      '**/test-results/',
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
      '@stylistic/member-delimiter-style': [
        'error',
        {
          'multiline': {
            'delimiter': 'none', // No delimiter for multiline
            'requireLast': false,
          },
          'singleline': {
            'delimiter': 'comma', // Use a comma for single-line
            'requireLast': false,
          },
        },
      ],
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
      '@stylistic/space-infix-ops': ['error', { 'int32Hint': false }],
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
      '@typescript-eslint/no-empty-object-type': ['error', {
        allowInterfaces: 'with-single-extends',
      }],
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
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/array-type': ['error', {
        default: 'array-simple',
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
        {
          key: 'data-allow-mismatch',
          message: 'Using "data-allow-mismatch" to prevent hydration errors is _very_ discouraged. \nPlease attempt to resolve the underlying hydration issue. If you are unable to resolve the issue and must use this attribute, please only disable the error for the impacted line.',
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
      '**/*.{js,cjs,jsx}',
    ],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]
