import type { APIRoute } from 'astro';
import { allRecipes, publicRecipe } from '../../lib/catalogue.ts';
export async function getStaticPaths() {
  return (await allRecipes()).map((recipe) => ({ params: { slug: recipe.id }, props: { recipe } }));
}
export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify(publicRecipe(props.recipe), null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
