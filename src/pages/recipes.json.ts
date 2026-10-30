import type { APIRoute } from 'astro';
import { allRecipes, publicRecipe } from '../lib/catalogue.ts';
import { SITE } from '../lib/recipe.ts';
export const GET: APIRoute = async () =>
  new Response(
    JSON.stringify(
      {
        schemaVersion: 1,
        title: 'Cookbook',
        url: SITE,
        recipes: (await allRecipes()).map(publicRecipe),
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
