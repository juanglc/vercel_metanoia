import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://vercel-metanoia.vercel.app',

  // ✅ CRITICAL: Hybrid mode for SSR + static pages
  output: 'hybrid',

  // ✅ Vercel serverless adapter
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),

  // Integrations
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-CO',
        },
      },
      filter: (page) => !page.includes('/api/'),
    }),
  ],

  // Build configuration
  build: {
    inlineStylesheets: 'auto',
  },
});
