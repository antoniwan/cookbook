import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublished, plainText, recipeGroup, recipeParts, SITE } from './recipe.ts';
import { recipeStructuredData } from './seo.ts';
import { recipeImage } from './images.ts';

export type Recipe = CollectionEntry<'recipes'>;

export async function allRecipes() {
  return (await getCollection('recipes')).filter((recipe) => isPublished(recipe.data));
}

export function publicRecipe(recipe: Recipe) {
  const parts = recipeParts(recipe.body ?? '');
  const hasPhoto = Boolean(
    recipeImage(recipe.data.heroImage, recipe.data.imageKind, recipe.data.imageOwnership),
  );
  return {
    id: `${SITE}/recipes/${recipe.id}`,
    slug: recipe.id,
    title: recipe.data.title,
    description: recipe.data.description,
    language: recipe.data.language[0],
    hasPhoto,
    imageOwnership: recipe.data.imageOwnership,
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
    imageCredit: hasPhoto ? recipe.data.imageCredit : undefined,
    imageCreditUrl: hasPhoto ? recipe.data.imageCreditUrl : undefined,
    imageLicense: hasPhoto ? recipe.data.imageLicense : undefined,
  };
}

export function structuredRecipe(recipe: Recipe, image?: string) {
  const record = publicRecipe(recipe);
  return recipeStructuredData(record, record.hasPhoto ? image : undefined);
}
