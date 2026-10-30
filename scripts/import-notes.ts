// TypeScript imports reviewed public recipe files with Node's standard library.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { recipeParts } from '../src/lib/recipe.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [notesRoot, inventoryPath] = process.argv.slice(2);
if (!notesRoot || !inventoryPath)
  throw new Error('Usage: node scripts/import-notes.ts <Notes checkout> <reviewed inventory JSON>');
const inventory = JSON.parse(readFileSync(inventoryPath, 'utf8'));
const recipes = inventory.content.filter((entry: any) => entry.public && entry.form === 'recipe');
const hash = (content: Buffer | string) => createHash('sha256').update(content).digest('hex');
const files: any[] = [];
const assets = new Map<string, any>();
for (const recipe of recipes) {
  const original = readFileSync(join(notesRoot, recipe.source), 'utf8');
  if (hash(original) !== recipe.sourceSha256)
    throw new Error('Source changed since review: ' + recipe.id);
  if (/\[\[|\[!panda\]|\/Users\//i.test(original))
    throw new Error('Nonpublic syntax in recipe: ' + recipe.id);
  const markdown = original
    .replaceAll('/p/recipes/', '/recipes/')
    .replace(/\]\(\/p\//g, '](https://notes.antoniwan.online/p/');
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const parts = recipeParts(body);
  if (!parts.ingredients.length || !parts.method.length)
    throw new Error('Incomplete recipe: ' + recipe.id);
  const destination = 'src/content/recipes/' + recipe.id.replace(/^recipes\//, '') + '.md';
  mkdirSync(dirname(join(root, destination)), { recursive: true });
  writeFileSync(join(root, destination), markdown);
  files.push({
    slug: recipe.id.replace(/^recipes\//, ''),
    sourceUrl: recipe.url,
    sourcePath: recipe.source,
    sourceSha256: hash(original),
    destination,
    destinationSha256: hash(markdown),
    language: recipe.language[0],
    translationGroup: recipe.translationGroup,
  });
  if (recipe.heroImage && !assets.has(recipe.heroImage)) {
    const candidate = join(notesRoot, 'src/assets' + recipe.heroImage);
    const source = existsSync(candidate) ? candidate : join(notesRoot, 'public' + recipe.heroImage);
    const destination = 'src/assets' + recipe.heroImage;
    mkdirSync(dirname(join(root, destination)), { recursive: true });
    copyFileSync(source, join(root, destination));
    assets.set(recipe.heroImage, {
      image: recipe.heroImage,
      sourceSha256: hash(readFileSync(source)),
      destination,
      credit: recipe.imageCredit,
      creditUrl: recipe.imageCreditUrl,
      license: recipe.imageLicense,
    });
  }
}
mkdirSync(join(root, 'docs'), { recursive: true });
writeFileSync(
  join(root, 'docs/migration.json'),
  JSON.stringify(
    {
      migratedAt: new Date().toISOString(),
      sourceCommit: inventory.repositories.find((entry: any) => entry.name === 'notes').commit,
      files,
      assets: [...assets.values()],
    },
    null,
    2,
  ) + '\n',
);
console.log(JSON.stringify({ recipes: files.length, images: assets.size }));
