import eslintKongUiConfig from './index.mjs'
import pluginCypress from 'eslint-plugin-cypress'

export default [
  // Use the main config for all files
  ...eslintKongUiConfig,
  pluginCypress.configs.recommended,
  {
    rules: {
      'promise/always-return': 'off',
      'promise/catch-or-return': 'off',
      'promise/no-nesting': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]
