import eslintPluginJsonc from 'eslint-plugin-jsonc'
import jsonParser from 'jsonc-eslint-parser'

export default [
  // JSON formatting for locale files
  ...eslintPluginJsonc.configs['flat/base'],
  ...eslintPluginJsonc.configs['flat/recommended-with-json'],
  // Global ignores
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/public/',
      '**/bin/',
    ],
  },
  {
    files: [
      '**/*.{json,jsonc}',
    ],
    ignores: [
      // Common ignores for JSON linting
      '**/package.json',
      '**/renovate.json',
      '**/tsconfig.json',
      '**/tsconfig.*.json',
    ],
    languageOptions: {
      parser: jsonParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'jsonc/indent': ['error', 2, {}],
      'jsonc/key-name-casing': ['error',
        {
          camelCase: false,
          PascalCase: false,
          SCREAMING_SNAKE_CASE: false,
          'kebab-case': false,
          snake_case: true,
          ignores: [],
        },
      ],
      'jsonc/sort-keys': ['error',
        {
          pathPattern: '.*',
          order: {
            type: 'asc',
            natural: true,
            caseSensitive: true,
          },
          minKeys: 2,
        },
      ],
      'jsonc/key-spacing': ['error',
        {
          beforeColon: false,
          afterColon: true,
          mode: 'strict',
        },
      ],
    },
  },
]
