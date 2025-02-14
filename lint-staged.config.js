/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{ts,tsx}': ['npm run prettify', 'eslint --fix'],
};
