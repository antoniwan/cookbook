import type { APIRoute } from 'astro';
import { allRecipes } from '../lib/catalogue.ts';
import { SITE } from '../lib/recipe.ts';
export const GET: APIRoute = async () => new Response(`# Cookbook\n\nFamily recipes in English and Spanish. The published recipe is the source; distinguish proposed variations from the recipe itself.\n\n- Catalogue: ${SITE}/recipes.json\n- Contents: ${SITE}/contents\n\n## Recipes\n\n${(await allRecipes()).map(recipe => `- [${recipe.data.title} (${recipe.data.language[0]})](${SITE}/recipes/${recipe.id}.md)`).join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
