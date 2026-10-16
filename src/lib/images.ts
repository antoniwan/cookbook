import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/images/**/*.{avif,webp,jpg,jpeg,png}', { eager: true });

export function recipeImage(path?: string): ImageMetadata | undefined {
  return path ? images['../assets' + path]?.default : undefined;
}
