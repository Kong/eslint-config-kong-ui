import eslintKongUiConfig from './index.mjs'
import pluginPlaywright from 'eslint-plugin-playwright'

export default [
  ...eslintKongUiConfig,
  pluginPlaywright.configs['flat/recommended'],
]
