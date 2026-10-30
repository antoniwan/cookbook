import type { APIRoute } from 'astro';
import { allRecipes } from '../../lib/catalogue.ts';
export async function getStaticPaths() {
  return (await allRecipes()).map((recipe) => ({ params: { slug: recipe.id }, props: { recipe } }));
}
export const GET: APIRoute = ({ props }) =>
  new Response(`# ${props.recipe.data.title}\n\n${props.recipe.body}`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
