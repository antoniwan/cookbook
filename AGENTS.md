# Cookbook: agent guide

Family recipes in English and Spanish. Astro, TypeScript, and plain CSS, pnpm, Node 22, deployed by Vercel from `main`. Read `README.md` first.

This repository is public. Anything you commit is published.

## Read before changing

- **Recipe text:** [docs/recipe-writing.md](docs/recipe-writing.md). The parser in `src/lib/recipe.ts` reads the `## Ingredients`, `## Equipment`, `## Method`, and `## Notes` headings by name.
- **Recipe metadata:** [docs/recipe-metadata.md](docs/recipe-metadata.md). Times and yields come only from what the recipe states. Never estimate them.
- **Photos:** [docs/photo-rulebook.md](docs/photo-rulebook.md) and [docs/photo-scorecard.md](docs/photo-scorecard.md). Only confirmed original photos go on the site; otherwise the page keeps its placeholder.

## Code style

Prettier formats everything (`pnpm format`). ESLint and Stylelint check correctness only, not style. The settings match the Notes repo; change them there and here together.

The pre-commit hook runs all three on staged files. Don't skip it, except for a commit that only reformats, and add that commit's hash to `.git-blame-ignore-revs`.

## Before a PR

```bash
pnpm format:check && pnpm lint && pnpm lint:css && pnpm test && pnpm check && pnpm build && pnpm validate
```

Add an entry under `## Unreleased` in `CHANGELOG.md`, in the voice of the entries already there. Then check browsing, search, quantities, printing, and translation links in a browser.
