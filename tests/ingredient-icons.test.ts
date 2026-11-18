// TypeScript checks that ingredient lines map to the right drawing.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { INGREDIENT_ICONS, ingredientIcon } from '../src/lib/ingredient-icons.ts';
import { recipeParts } from '../src/lib/recipe.ts';

test('ingredient lines in both languages map to their drawing', () => {
  const cases: [string, string | undefined][] = [
    ['1 head of garlic (10 to 12 cloves), peeled', 'garlic'],
    ['1 cabeza de ajo, pelada', 'garlic'],
    ['1 teaspoon garlic powder', 'spice'],
    ['10 to 15 ajíes dulces, seeded', 'aji'],
    ['1 bunch recao / culantro (broad-leaf culantro)', 'recao'],
    ['1 bunch cilantro', 'cilantro'],
    ['2 onions, in quarters', 'onion'],
    ['1 large green pepper (or 2 cubanelle), seeded', 'pepper'],
    ['Salt and pepper to taste', 'salt'],
    ['½ teaspoon black pepper', 'spice'],
    ['1 to 2 tablespoons olive oil', 'oil'],
    ['1 cup buttermilk', 'milk'],
    ['½ cup unsalted butter', 'butter'],
    ['2 huevos', 'egg'],
    ['2 cups all-purpose flour', 'flour'],
    ['1 sobre de sazón', 'spice'],
    ['2 cups arroz de grano medio', 'rice'],
    ['1 can gandules', 'beans'],
    ['3 batatas', 'potato'],
    ['1 cup water', undefined],
  ];
  for (const [line, icon] of cases) assert.equal(ingredientIcon(line), icon, line);
});

test('every drawing the matcher can return exists in the drawing set', () => {
  const sprite = readFileSync('src/components/IngredientIcons.astro', 'utf8');
  for (const icon of INGREDIENT_ICONS) assert.match(sprite, new RegExp(`id="ing-${icon}"`), icon);
});

test('most ingredient lines in the cookbook get a drawing', () => {
  let lines = 0;
  let drawn = 0;
  for (const file of readdirSync('src/content/recipes')) {
    const body = readFileSync(`src/content/recipes/${file}`, 'utf8').split(/^---$/m)[2] ?? '';
    for (const line of recipeParts(body).ingredients) {
      lines++;
      if (ingredientIcon(line)) drawn++;
    }
  }
  assert.ok(drawn / lines > 0.6, `${drawn} of ${lines} lines have a drawing`);
});
