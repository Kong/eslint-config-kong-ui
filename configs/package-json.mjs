import eslintPluginJsonc from 'eslint-plugin-jsonc'
import jsonParser from 'jsonc-eslint-parser'

export default [
  {
    files: ['**/package.json'],
    languageOptions: {
      parser: jsonParser,
    },
    plugins: {
      jsonc: eslintPluginJsonc,
    },
    rules: {
      // Sort the files array alphabetically
      'jsonc/sort-array-values': [
        'error',
        {
          order: { type: 'asc' },
          pathPattern: '^files$',
        },
      ],
      // Sort the keys in package.json
      'jsonc/sort-keys': [
        'error',
        {
          // Top-level properties order
          order: [
            'name',
            'version',
            'description',
            'type',
            'main',
            'files',
            'exports',
            'publishConfig',
            'scripts',
            'dependencies',
            'peerDependencies',
            'devDependencies',
            'pnpm',
            'repository',
            'keywords',
            'author',
            'license',
            'bugs',
            'homepage',
            'release',
          ],
          pathPattern: '^$',
        },
        {
          // Sort dependency objects alphabetically
          order: { type: 'asc' },
          pathPattern: '^(?:dev|peer|optional)?[Dd]ependencies$',
        },
        {
          // Sort scripts alphabetically
          order: { type: 'asc' },
          pathPattern: '^scripts$',
        },
        {
          // Sort exports object
          order: { type: 'asc' },
          pathPattern: '^exports$',
        },
        {
          // Sort pnpm object
          order: { type: 'asc' },
          pathPattern: '^pnpm$',
        },
      ],
    },
  },
]
