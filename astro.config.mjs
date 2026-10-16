import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import recipeStepAnchors from './src/lib/recipe-step-anchors.ts';

export default defineConfig({
  site: 'https://cookbook.antoniwan.online',
  output: 'static',
  trailingSlash: 'never',
  markdown: { processor: satteri({ mdastPlugins: [recipeStepAnchors()] }) },
  integrations: [sitemap()],
});
