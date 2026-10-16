// TypeScript tests structured data with Node's built-in runner without requiring Astro's runtime.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AUTHOR, breadcrumbStructuredData, durationLabel, recipeListStructuredData, recipeStructuredData, websiteStructuredData } from '../src/lib/seo.ts';
import { SITE } from '../src/lib/recipe.ts';

const record = {
  id: `${SITE}/recipes/example`, title: 'Example', description: 'A recipe.', language: 'en',
  publishedAt: '2026-01-01T00:00:00.000Z', ingredients: ['2 carrots'], method: ['Cook the carrots.'],
  subjects: ['carrots'], recipeCategory: 'Sides & staples',
};

test('site identity describes Cookbook and Antonio without claiming a separate company publisher', () => {
  const website = websiteStructuredData();
  assert.equal(website['@type'], 'WebSite');
  assert.equal(website.url, `${SITE}/`);
  assert.deepEqual(website.publisher, AUTHOR);
  assert.equal(website.publisher['@type'], 'Person');
});

test('recipe list positions and canonical URLs follow visible recipe order', () => {
  const list = recipeListStructuredData([{ id: 'second', data: { title: 'Second' } }, { id: 'first', data: { title: 'First' } }], '/contents');
  assert.equal(list.numberOfItems, 2);
  assert.deepEqual(list.itemListElement.map(item => [item.position, item.url]), [[1, `${SITE}/recipes/second`], [2, `${SITE}/recipes/first`]]);
});

test('breadcrumb positions describe the same public navigation', () => {
  const breadcrumb = breadcrumbStructuredData([{ name: 'Cookbook', url: `${SITE}/` }, { name: 'Recipes', url: `${SITE}/contents` }, { name: 'Example', url: record.id }]);
  assert.equal(breadcrumb.itemListElement.length, 3);
  assert.equal(breadcrumb.itemListElement[2].item, record.id);
  assert.equal(breadcrumb.itemListElement[2].position, 3);
});

test('recipe schema omits unknown durations, yields, nutrition, and ratings', () => {
  const schema = recipeStructuredData(record);
  for (const key of ['prepTime', 'cookTime', 'totalTime', 'recipeYield', 'recipeCuisine', 'nutrition', 'aggregateRating']) assert.ok(!(key in schema), key);
  assert.equal(schema.recipeCategory, record.recipeCategory);
  assert.equal(schema.recipeInstructions[0].text, record.method[0]);
});

test('supported recipe facts propagate without inventing missing preparation time', () => {
  const schema = recipeStructuredData({ ...record, totalTime: 'PT15M', recipeYield: '1', recipeCuisine: 'Puerto Rican', subjects: ['puerto-rico', 'carrots'], cookTime: 'PT5M' });
  assert.equal(schema.totalTime, 'PT15M');
  assert.equal(schema.recipeYield, '1');
  assert.equal(schema.recipeCuisine, 'Puerto Rican');
  assert.equal(schema.keywords, 'carrots');
  assert.ok(!('cookTime' in schema));
  const timed = recipeStructuredData({ ...record, prepTime: 'PT10M', cookTime: 'PT20M' });
  assert.equal(timed.prepTime, 'PT10M');
  assert.equal(timed.cookTime, 'PT20M');
  assert.equal(durationLabel('PT1H30M'), '1 h 30 min');
  assert.equal(durationLabel('PT15M'), '15 min');
  assert.throws(() => durationLabel('PT'));
});
