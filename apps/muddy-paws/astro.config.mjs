// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Production origin lives in src/site.config.ts (seo.siteUrl). Keep both in sync when
// a client's domain changes — Astro needs it here for sitemap + canonical generation.
const SITE_URL = 'https://muddypaws.example.co.uk';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [preact(), sitemap({ filter: (p) => !p.includes('/credits') && !p.includes('/404') })],
  vite: { plugins: [tailwindcss()] },
  image: { responsiveStyles: true },
});
