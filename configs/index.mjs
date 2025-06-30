import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'
import pluginPromise from 'eslint-plugin-promise'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

const stylisticRules = {
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
  '@stylistic/template-curly-spacing': ['error', 'never'],
  '@stylistic/padded-blocks': 'off',
  '@stylistic/no-trailing-spaces': 'error',
  '@stylistic/no-multi-spaces': 'error',
  '@stylistic/space-before-blocks': ['error', 'always'],
  '@stylistic/space-infix-ops': ['error', { 'int32Hint': false }],
  '@stylistic/keyword-spacing': ['error', {
    before: true,
    after: true,
  }],
  '@stylistic/arrow-spacing': ['error', {
    before: true,
    after: true,
  }],
  '@stylistic/comma-spacing': ['error', {
    before: false,
    after: true,
  }],
  '@stylistic/key-spacing': ['error', {
    beforeColon: false,
    afterColon: true,
  }],
}

// Create vue/* rules from @stylistic/* rules
function buildVueStylisticRules(rules, suffixes) {
  return Object.fromEntries(
    suffixes.flatMap((item) => {
      const [vueSuffix, stylisticSuffix] = Array.isArray(item)
        ? item
        : [item, item]
      const key = `@stylistic/${stylisticSuffix}`
      return key in rules ? [[`vue/${vueSuffix}`, rules[key]]] : []
    }),
  )
}

const vueStylisticRules = buildVueStylisticRules(stylisticRules, [
  // These are extension rules from eslint-plugin-vue (not included in `pluginVue.configs['flat/recommended']`)
  // and are part of the stylistic rules. So we need to include them here so that we have consistent
  // stylistic rules across both scripts and templates.
  // See: https://eslint.vuejs.org/rules/#extension-rules.
  'array-bracket-spacing',
  'arrow-spacing',
  'comma-dangle',
  'comma-spacing',
  ['func-call-spacing', 'function-call-spacing'], // alias
  'key-spacing',
  'keyword-spacing',
  'object-curly-spacing',
  'space-infix-ops',
  'template-curly-spacing',
])

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  pluginPromise.configs['flat/recommended'],
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
      ...stylisticRules,
      ...vueStylisticRules,
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
      // We only allow single-line in Vue templates.
      'vue/brace-style': ['error', '1tbs', {
        allowSingleLine: true,
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
