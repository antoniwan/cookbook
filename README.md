# Cookbook

Family recipes in English and Spanish. Built with Astro and TypeScript.

Public home: https://cookbook.antoniwan.online.

## Work locally

1. Use the Node version in .nvmrc.
2. Run pnpm install --frozen-lockfile.
3. Run pnpm dev.

## Verify a release

1. Run pnpm run format:check (pnpm run format fixes it).
2. Run pnpm lint.
3. Run pnpm test.
4. Run pnpm check.
5. Run pnpm build.
6. Run pnpm validate.
7. Verify browsing, recipe search, ingredient checklists, quantities, printing, and translation links in a browser.

## Content

Recipes live in src/content/recipes/. The public recipe body supplies the ingredient, equipment, method, and notes records.

The same source produces HTML, Recipe JSON-LD, JSON, and Markdown. Do not maintain a second recipe catalogue by hand.

Public machine endpoints: /recipes.json, /recipes/<slug>.json, /recipes/<slug>.md, and /llms.txt.

Structured data covers recipes, recipe lists, breadcrumbs, and site identity. Supported recipe facts and their evidence are documented in docs/recipe-metadata.md.

The first migration copies already-public recipes from Notes. It does not read Panda or change the Notes site.

Each page keeps its image credit and license. Asset source records are in docs/migration.json.

The [recipe photography plan](docs/recipe-photography.md) records the visual direction, capture checklist, and progress for all 28 dishes.

The [photo rulebook](docs/photo-rulebook.md) sets the quality bar for photographs and explains the reasons behind each rule, with practice drills. The [photo scorecard](docs/photo-scorecard.md) grades each candidate as keep, edit, or retake. The [photo and layout audit](docs/photo-audit-2026-10.md) records how the site crops photographs.

The [recipe writing rules](docs/recipe-writing.md) set the house style for recipe text in both languages.

The [recipe shot list](docs/recipe-shot-list.md) lists each dish's cover, detail, and optional process photographs.

The [recipe placeholder guide](docs/recipe-placeholder.md) records the missing-photo pattern, its prompt, and its structured-data policy.

The [quantity controls guide](docs/quantity-controls.md) describes custom batches, original-amount comparisons, ingredient copying, and scaling limits.

The garlic bulb and strawberry are Cookbook's companion mascots. Their illustration prompt is recorded in docs/mascots.md.
