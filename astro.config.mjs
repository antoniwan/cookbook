import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cookbook.antoniwan.online',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
