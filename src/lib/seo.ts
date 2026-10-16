import { SITE } from './recipe.ts';

export const AUTHOR = { '@type': 'Person', '@id': 'https://antoniwan.online/#person', name: 'Antonio', url: 'https://antoniwan.online' };

export function websiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: 'Cookbook',
    description: 'Family recipes in English and Spanish.',
    inLanguage: ['en', 'es'],
    publisher: AUTHOR,
  };
}

export function recipeListStructuredData(recipes: { id: string; data: { title: string } }[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${new URL(path, SITE).href}#recipes`,
    name: 'Cookbook recipes',
    numberOfItems: recipes.length,
    itemListElement: recipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: recipe.data.title,
      url: `${SITE}/recipes/${recipe.id}`,
    })),
  };
}

export function breadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })),
  };
}

interface RecipeRecord {
  id: string;
  title: string;
  description: string;
  language: string;
  publishedAt: string;
  revisedAt?: string;
  ingredients: string[];
  equipment: string[];
  method: string[];
  subjects: string[];
  recipeCategory: string;
  recipeCuisine?: string;
  recipeYield?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
}

export function recipeStructuredData(record: RecipeRecord, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    '@id': record.id,
    url: record.id,
    mainEntityOfPage: record.id,
    isPartOf: { '@id': `${SITE}/#website` },
    name: record.title,
    description: record.description,
    inLanguage: record.language,
    datePublished: record.publishedAt,
    dateModified: record.revisedAt ?? record.publishedAt,
    ...(image ? { image: [image] } : {}),
    author: AUTHOR,
    recipeIngredient: record.ingredients,
    recipeInstructions: record.method.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: text.split(/[.!?](?:\s|$)/)[0].trim(), text, url: `${record.id}#step-${index + 1}` })),
    tool: record.equipment.map(name => ({ '@type': 'HowToTool', name })),
    recipeCategory: record.recipeCategory,
    ...(record.recipeCuisine ? { recipeCuisine: record.recipeCuisine } : {}),
    ...(record.recipeYield ? { recipeYield: record.recipeYield } : {}),
    ...(record.prepTime && record.cookTime ? { prepTime: record.prepTime, cookTime: record.cookTime } : {}),
    ...(record.totalTime ? { totalTime: record.totalTime } : {}),
    keywords: record.subjects.filter(subject => subject !== 'puerto-rico').join(', '),
  };
}

export function durationLabel(duration: string): string {
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
  if (!match || (!match[1] && !match[2])) throw new Error(`Unsupported recipe duration: ${duration}`);
  return [match[1] && `${Number(match[1])} h`, match[2] && `${Number(match[2])} min`].filter(Boolean).join(' ');
}
