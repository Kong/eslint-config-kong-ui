import eslintKongUiConfig from './index.mjs'

// Compatibility utils
import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat()

export default [
  // Use the main config for all files
  ...eslintKongUiConfig,
  ...compat.config({
    extends: ['plugin:cypress/recommended'],
  }),
  {
    rules: {
      'promise/always-return': 'off',
      'promise/catch-or-return': 'off',
      'promise/no-nesting': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]
