import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublished, plainText, recipeGroup, recipeParts, SITE } from './recipe.ts';
import { recipeStructuredData } from './seo.ts';

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
    recipeCategory: recipeGroup(recipe.id),
    recipeCuisine: recipe.data.tags.includes('puerto-rico') ? 'Puerto Rican' : undefined,
    recipeYield: recipe.data.recipeYield,
    prepTime: recipe.data.prepTime,
    cookTime: recipe.data.cookTime,
    totalTime: recipe.data.totalTime,
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
  return recipeStructuredData(publicRecipe(recipe), image);
}
