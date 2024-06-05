import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

// Compatibility utils
import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat()

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.config({
    extends: ['plugin:cypress/recommended'],
  }),
  {
    ...compat.config({
      extends: ['plugin:cypress/recommended'],
    }),
    rules: {
      'promise/always-return': 'off',
      'promise/catch-or-return': 'off',
      'promise/no-nesting': 'off',
    },
  },
]
