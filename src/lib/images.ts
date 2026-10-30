import type { ImageMetadata } from 'astro';
import { hasRecipePhoto } from './recipe.ts';

const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/**/*.{avif,webp,jpg,jpeg,png}',
  { eager: true },
);

export function recipeImage(
  path?: string,
  imageKind?: 'photo' | 'illustration',
  imageOwnership?: 'original' | 'third-party' | 'unverified',
): ImageMetadata | undefined {
  return hasRecipePhoto({ heroImage: path, imageKind, imageOwnership })
    ? images['../assets' + path]?.default
    : undefined;
}
