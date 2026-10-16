import type { APIRoute } from 'astro';
import { allRecipes } from '../lib/catalogue.ts';
import { SITE } from '../lib/recipe.ts';
const xml = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const GET: APIRoute = async () => {
  const recipes = (await allRecipes()).filter(recipe => recipe.data.language[0] === 'en').sort((first, second) => second.data.pubDate.valueOf() - first.data.pubDate.valueOf());
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Cookbook</title><link>${SITE}</link><description>Family recipes from our kitchen.</description><language>en</language>${recipes.map(recipe => `<item><title>${xml(recipe.data.title)}</title><link>${SITE}/recipes/${recipe.id}</link><guid>${SITE}/recipes/${recipe.id}</guid><pubDate>${recipe.data.pubDate.toUTCString()}</pubDate><description>${xml(recipe.data.description)}</description></item>`).join('')}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
