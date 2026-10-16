// TypeScript checks the built public site and migration records with Node's standard library.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { SITE } from '../src/lib/recipe.ts';
import { durationLabel } from '../src/lib/seo.ts';

const dist = resolve('dist');
const catalogue = JSON.parse(readFileSync(join(dist, 'recipes.json'), 'utf8'));
const manifest = JSON.parse(readFileSync('docs/migration.json', 'utf8'));
const schemasIn = (html: string): any[] => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
assert.equal(catalogue.recipes.length, manifest.files.length);
assert.equal(new Set(catalogue.recipes.map((recipe: any) => recipe.id)).size, catalogue.recipes.length);
for (const recipe of catalogue.recipes) {
  const html = readFileSync(join(dist, 'recipes', recipe.slug, 'index.html'), 'utf8');
  const markdown = readFileSync(join(dist, 'recipes', recipe.slug + '.md'), 'utf8');
  const json = JSON.parse(readFileSync(join(dist, 'recipes', recipe.slug + '.json'), 'utf8'));
  const schemas = schemasIn(html);
  const schema = schemas.find(value => value['@type'] === 'Recipe');
  assert.ok(schema, recipe.slug + ': Recipe JSON-LD');
  assert.equal(schema['@id'], recipe.id);
  assert.equal(json.id, recipe.id);
  assert.deepEqual(schema.recipeIngredient, recipe.ingredients);
  assert.equal(schema.recipeInstructions.length, recipe.method.length);
  assert.deepEqual(schema.tool.map((tool: any) => tool.name), recipe.equipment);
  schema.recipeInstructions.forEach((step: any, index: number) => {
    assert.ok(step.name, recipe.slug + ': step name');
    assert.equal(step.url, `${recipe.id}#step-${index + 1}`);
    assert.ok(html.includes(`id="step-${index + 1}"`), recipe.slug + ': missing step anchor');
  });
  assert.equal(schema.recipeCategory, recipe.group);
  for (const field of ['recipeCuisine', 'recipeYield', 'prepTime', 'cookTime', 'totalTime']) assert.equal(schema[field], recipe[field], recipe.slug + ': ' + field);
  assert.equal(Boolean(schema.prepTime), Boolean(schema.cookTime));
  assert.ok(!schema.nutrition && !schema.aggregateRating, recipe.slug + ': invented nutrition or ratings');
  assert.ok(html.includes('class="recipe-facts"'), recipe.slug + ': visible recipe facts');
  if (recipe.totalTime) assert.ok(html.includes(durationLabel(recipe.totalTime)), recipe.slug + ': visible duration');
  const breadcrumbs = schemas.find(value => value['@type'] === 'BreadcrumbList');
  assert.deepEqual(breadcrumbs?.itemListElement.map((item: any) => item.item), [`${SITE}/`, `${SITE}/contents`, recipe.id]);
  assert.ok(schema.image?.length, recipe.slug + ': required dish image');
  assert.ok(html.includes(`href="${SITE}/recipes/${recipe.slug}"`), recipe.slug + ': canonical URL');
  assert.ok(markdown.startsWith('# ' + recipe.title));
  assert.ok(recipe.ingredients.length && recipe.method.length && recipe.equipment.length);
  assert.ok(!/\[\[|\[!panda\]|\/Users\//i.test(markdown));
  for (const image of schema.image ?? []) assert.ok(existsSync(join(dist, new URL(image).pathname)), image);
  if (recipe.translationGroup) {
    const twin = catalogue.recipes.find((entry: any) => entry.slug !== recipe.slug && entry.translationGroup === recipe.translationGroup);
    assert.ok(twin, recipe.slug + ': missing translation');
    assert.ok(html.includes(`href="/recipes/${twin.slug}"`));
  }
}
const listedRecipes = catalogue.recipes.filter((recipe: any) => recipe.language === 'en').sort((first: any, second: any) => first.title.localeCompare(second.title));
for (const page of ['index.html', 'contents/index.html']) {
  const schemas = schemasIn(readFileSync(join(dist, page), 'utf8'));
  const list = schemas.find(value => value['@type'] === 'ItemList');
  assert.equal(list?.numberOfItems, listedRecipes.length, page + ': recipe list count');
  assert.deepEqual(list.itemListElement.map((item: any) => item.url), listedRecipes.map((recipe: any) => recipe.id));
  assert.deepEqual(list.itemListElement.map((item: any) => item.position), listedRecipes.map((_: any, index: number) => index + 1));
}
const website = schemasIn(readFileSync(join(dist, 'index.html'), 'utf8')).find(value => value['@type'] === 'WebSite');
assert.equal(website?.name, 'Cookbook');
assert.equal(website.url, `${SITE}/`);
assert.equal(website.publisher['@type'], 'Person');
assert.equal(catalogue.recipes.filter((recipe: any) => recipe.totalTime).length, 4);
assert.equal(catalogue.recipes.filter((recipe: any) => recipe.recipeYield).length, 12);
const htmlFiles = (root: string): string[] => readdirSync(root, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? htmlFiles(join(root, entry.name)) : entry.name.endsWith('.html') ? [join(root, entry.name)] : []);
for (const path of htmlFiles(dist)) {
  const html = readFileSync(path, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const target = join(dist, decodeURIComponent(match[1]));
    assert.ok(existsSync(target) || existsSync(target + '.html') || existsSync(join(target, 'index.html')), path + ': missing ' + match[1]);
  }
}
assert.ok(existsSync(join(dist, 'sitemap-index.xml')));
assert.ok(existsSync(join(dist, 'mascots.webp')));
for (const icon of ['garlic', 'strawberry', 'garlic-angry']) assert.ok(existsSync(join(dist, 'icons', `${icon}.webp`)));
assert.ok(!readFileSync(join(dist, 'index.html'), 'utf8').includes('✳'));
assert.ok(!readFileSync(join(dist, 'index.html'), 'utf8').includes('wordmark-dot'));
assert.equal((readFileSync(join(dist, 'rss.xml'), 'utf8').match(/<item>/g) ?? []).length, 28);
console.log(`Validated ${catalogue.recipes.length} recipe pages, translations, machine endpoints, structured data, images, and internal links.`);
