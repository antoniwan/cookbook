// TypeScript checks the built public site and migration records with Node's standard library.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { SITE } from '../src/lib/recipe.ts';

const dist = resolve('dist');
const catalogue = JSON.parse(readFileSync(join(dist, 'recipes.json'), 'utf8'));
const manifest = JSON.parse(readFileSync('docs/migration.json', 'utf8'));
assert.equal(catalogue.recipes.length, manifest.files.length);
assert.equal(new Set(catalogue.recipes.map((recipe: any) => recipe.id)).size, catalogue.recipes.length);
for (const recipe of catalogue.recipes) {
  const html = readFileSync(join(dist, 'recipes', recipe.slug, 'index.html'), 'utf8');
  const markdown = readFileSync(join(dist, 'recipes', recipe.slug + '.md'), 'utf8');
  const json = JSON.parse(readFileSync(join(dist, 'recipes', recipe.slug + '.json'), 'utf8'));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const schema = schemas.find(value => value['@type'] === 'Recipe');
  assert.ok(schema, recipe.slug + ': Recipe JSON-LD');
  assert.equal(schema['@id'], recipe.id);
  assert.equal(json.id, recipe.id);
  assert.deepEqual(schema.recipeIngredient, recipe.ingredients);
  assert.equal(schema.recipeInstructions.length, recipe.method.length);
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
assert.equal((readFileSync(join(dist, 'rss.xml'), 'utf8').match(/<item>/g) ?? []).length, 28);
console.log(`Validated ${catalogue.recipes.length} recipe pages, translations, machine endpoints, structured data, images, and internal links.`);
