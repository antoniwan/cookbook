// Coding standards v1 (antoniwan/ai shared/standards). Copy to a repo's root.
// Drop a plugin the repo does not use (Tailwind, Astro) and its install.
/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-astro'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
