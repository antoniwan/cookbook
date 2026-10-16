import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublished, plainText, recipeGroup, recipeParts, SITE } from './recipe.ts';

export type Recipe = CollectionEntry<'recipes'>;

export async function allRecipes() {
  return (await getCollection('recipes')).filter(recipe => isPublished(recipe.data));
}

export function publicRecipe(recipe: Recipe) {
  const parts = recipeParts(recipe.body ?? '');
  return {
    id: `${SITE}/recipes/${recipe.id}`,
    slug: recipe.id,
    title: recipe.data.title,
    description: recipe.data.description,
    language: recipe.data.language[0],
    translationGroup: recipe.data.translationGroup,
    publishedAt: recipe.data.pubDate.toISOString(),
    revisedAt: recipe.data.updatedDate?.toISOString(),
    group: recipeGroup(recipe.id),
    subjects: recipe.data.tags,
    introduction: plainText(parts.introduction),
    ingredients: parts.ingredients.map(plainText),
    equipment: parts.equipment.map(plainText),
    method: parts.method.map(plainText),
    notes: parts.notes.map(plainText),
    markdownUrl: `${SITE}/recipes/${recipe.id}.md`,
    imageCredit: recipe.data.imageCredit,
    imageCreditUrl: recipe.data.imageCreditUrl,
    imageLicense: recipe.data.imageLicense,
  };
}

export function structuredRecipe(recipe: Recipe, image?: string) {
  const record = publicRecipe(recipe);
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    '@id': record.id,
    url: record.id,
    name: record.title,
    description: record.description,
    inLanguage: record.language,
    datePublished: record.publishedAt,
    dateModified: record.revisedAt ?? record.publishedAt,
    ...(image ? { image: [image] } : {}),
    author: { '@type': 'Person', name: 'Antonio', url: 'https://antoniwan.online' },
    recipeIngredient: record.ingredients,
    recipeInstructions: record.method.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, text })),
    keywords: record.subjects.join(', '),
  };
}
