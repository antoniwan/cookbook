// TypeScript exercises recipe contracts with Node's built-in test runner.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isPublished, recipeParts, safeJson, scaleIngredient } from '../src/lib/recipe.ts';

test('public eligibility excludes drafts, withdrawn, and scheduled recipes', () => {
  const now = new Date('2026-10-16T18:00:00Z');
  assert.equal(isPublished({ pubDate: new Date('2026-01-01') }, now), true);
  assert.equal(isPublished({ draft: true, pubDate: new Date('2026-01-01') }, now), false);
  assert.equal(isPublished({ published: false, pubDate: new Date('2026-01-01') }, now), false);
  assert.equal(isPublished({ pubDate: new Date('2027-01-01') }, now), false);
});

test('recipe extraction keeps continuation lines with their original step', () => {
  const parts = recipeParts('A dish.\n\n## Ingredients\n\n- 2 eggs\n- Salt\n\n## Equipment\n\n- A bowl\n\n## Method\n\n1. Mix.\n   Keep the texture coarse.\n2. Cook.\n\n## Notes\n\n- Cool before storing.');
  assert.deepEqual(parts.ingredients, ['2 eggs', 'Salt']);
  assert.deepEqual(parts.method, ['Mix.\n   Keep the texture coarse.', 'Cook.']);
  assert.equal(parts.introduction, 'A dish.');
});

test('quantity controls scale fractions and leave ambiguous alternatives unchanged', () => {
  assert.equal(scaleIngredient('3 bananas, mashed', 2), '6 bananas, mashed');
  assert.equal(scaleIngredient('¾ cup honey', 2), '1½ cup honey');
  assert.equal(scaleIngredient('1½ cups flour', 2), '3 cups flour');
  assert.equal(scaleIngredient('1 1/2 cups flour', 3), '4½ cups flour');
  assert.equal(scaleIngredient('1/2 teaspoon cinnamon', 3), '1½ teaspoon cinnamon');
  assert.equal(scaleIngredient('⅓ cup milk', 2), '⅔ cup milk');
  assert.equal(scaleIngredient('10 to 15 peppers', 2), '20 to 30 peppers');
  assert.equal(scaleIngredient('1/2 bottle brandy, or 3/4', 2), '1/2 bottle brandy, or 3/4');
  assert.equal(scaleIngredient('Salt to taste', 3), 'Salt to taste');
});

test('scaling supports smaller batches, ranges, optional amounts, and Spanish measures', () => {
  assert.equal(scaleIngredient('3 eggs', .5), '1½ eggs');
  assert.equal(scaleIngredient('1½ to 2 lb chicken', .5), '¾ to 1 lb chicken');
  assert.equal(scaleIngredient('6–12 chicken thighs', 1.5), '9–18 chicken thighs');
  assert.equal(scaleIngredient('(optional) ¼ cup cheese', 3), '(optional) ¾ cup cheese');
  assert.equal(scaleIngredient('(opcional) 1 a 2 cucharadas aceite', 2), '(opcional) 2 a 4 cucharadas aceite');
  assert.equal(scaleIngredient('Approximately 1 pound chicken', 2), 'Approximately 2 pound chicken');
  assert.equal(scaleIngredient('1/10 part baking powder', .5), '0.05 part baking powder');
  assert.equal(scaleIngredient('2 to 3 tablespoons oat milk', .5), '1 to 1½ tablespoons oat milk');
});

test('explicit equivalent measures scale together without changing dimensions or package sizes', () => {
  assert.equal(scaleIngredient('1½ cups (210 g) flour', 2), '3 cups (420 g) flour');
  assert.equal(scaleIngredient('170 g (12 tbsp / 1.5 sticks) butter', .5), '85 g (6 tbsp / ¾ sticks) butter');
  assert.equal(scaleIngredient('1.25 lb (567 g) chicken', 2), '2½ lb (1134 g) chicken');
  assert.equal(scaleIngredient('1 cup pumpkin, 1-inch cubes', 2), '2 cup pumpkin, 1-inch cubes');
  assert.equal(scaleIngredient('170 g chocolate (60 to 70%)', 2), '340 g chocolate (60 to 70%)');
  assert.equal(scaleIngredient('1 can (15 oz) beans', 2), '2 can (15 oz) beans');
  assert.equal(scaleIngredient('1 head garlic (10 to 12 cloves)', 2), '2 head garlic (10 to 12 cloves)');
  assert.equal(scaleIngredient('4 fish fillets, 6 to 8 ounces each', 2), '8 fish fillets, 6 to 8 ounces each');
  assert.equal(scaleIngredient('Approximately 2 inches of oil', 2), 'Approximately 2 inches of oil');
});

test('scaling preserves ambiguous alternatives and rejects invalid multipliers', () => {
  for (const text of ['2 eggs, or 1 cup milk', '1 tbsp oil + ½ tsp sazón', '1 tbsp tomato paste (or 2–3 tbsp tomato sauce)', 'About ¾ tsp salt, in three ¼ tsp passes', '1 cup flour (120 g plus 2 tbsp)']) assert.equal(scaleIngredient(text, 2), text);
  for (const multiplier of [0, -1, NaN, Infinity]) assert.equal(scaleIngredient('2 eggs', multiplier), '2 eggs');
  assert.equal(scaleIngredient('1/0 cup milk', 2), '1/0 cup milk');
});

test('JSON-LD cannot terminate its script element', () => {
  const serialized = safeJson({ title: '</script><script>alert(1)</script>' });
  assert.ok(!serialized.includes('<'));
  assert.equal(JSON.parse(serialized).title, '</script><script>alert(1)</script>');
});

test('every migrated public recipe retains a usable cooking structure and source hash', () => {
  const manifest = JSON.parse(readFileSync(new URL('../docs/migration.json', import.meta.url), 'utf8'));
  assert.equal(manifest.files.length, 40);
  const slugs = new Set();
  for (const entry of manifest.files) {
    assert.ok(!slugs.has(entry.slug));
    slugs.add(entry.slug);
    const text = readFileSync(new URL('../' + entry.destination, import.meta.url), 'utf8');
    const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    const parts = recipeParts(body);
    assert.ok(parts.ingredients.length, entry.slug + ' ingredients');
    assert.ok(parts.equipment.length, entry.slug + ' equipment');
    assert.ok(parts.method.length, entry.slug + ' method');
    assert.ok(!body.includes('/p/recipes/'), entry.slug + ' old recipe links');
    assert.ok(!/\[\[|\[!panda\]|\/Users\//i.test(text), entry.slug + ' private material');
    assert.match(entry.sourceSha256, /^[a-f0-9]{64}$/);
  }
  const groups = new Map<string, string[]>();
  for (const entry of manifest.files) if (entry.translationGroup) groups.set(entry.translationGroup, [...(groups.get(entry.translationGroup) ?? []), entry.language]);
  assert.equal(groups.size, 12);
  for (const languages of groups.values()) assert.deepEqual(languages.sort(), ['en', 'es']);
});
