// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dcrader-template-dentists.vercel.app',
  integrations: [sitemap()],
  output: 'static',
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});
