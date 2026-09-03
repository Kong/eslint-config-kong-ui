import eslintKongUiConfig from './configs/index.mjs'
import eslintKongUiConfigJson from './configs/json.mjs'
import eslintKongUiConfigCypress from './configs/cypress.mjs'
import eslintKongUiConfigPlaywright from './configs/playwright.mjs'

export default [
  // Use the main config for all files
  ...eslintKongUiConfig,
  // Only apply the shared JSON config to files that match the given pattern
  ...eslintKongUiConfigJson.map(config => ({
    ...config,
    files: ['**/fixtures/**/*.json'],
  })),
  // Only apply the shared Cypress config to files that match the given pattern
  ...eslintKongUiConfigCypress.map(config => ({
    ...config,
    files: [
      '**/*.cy.{ts,js}',
      '**/cypress/**',
    ],
  })),
  // Only apply the shared Playwright config to this repo's own fixture — the pattern
  // here is specific to this repo's fixture layout, not a recommended convention;
  // consuming repos should choose a pattern that matches their own test layout.
  ...eslintKongUiConfigPlaywright.map(config => ({
    ...config,
    files: [
      'fixtures/playwright/**',
    ],
  })),
]
