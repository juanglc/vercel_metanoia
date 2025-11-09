import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cuartetometanoia.com',
  output: 'server',
  adapter: cloudflare(),
    integrations: [
        tailwind({
            config: {
                applyBaseStyles: false // Usaremos nuestros estilos base custom
            },
        }),
        sitemap({
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en-US',
                    es: 'es-CO',
                },
            },
            // Filtrar páginas que no queremos en el sitemap
            filter: (page) => !page.includes('/api/'),
        }),
    ],

    // Optimizaciones de build
    build: {
        inlineStylesheets: 'auto', // Inline CSS crítico automáticamente
        assets: '_assets', // Carpeta para assets optimizados
    },

    // Configuración de Vite
    vite: {
        build: {
            cssMinify: 'lightningcss', // Minificación CSS más rápida
            rollupOptions: {
                output: {
                    // Mejores nombres de chunks para caching
                    assetFileNames: '_assets/[name].[hash][extname]',
                    chunkFileNames: '_assets/[name].[hash].js',
                    entryFileNames: '_assets/[name].[hash].js',
                },
            },
        },
        // Optimizar dependencias
        optimizeDeps: {
            exclude: ['@aws-sdk/client-s3'],
        },
    },

    // Configuración de imágenes
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp', // Usar Sharp para optimización
        },
    },

    // Configuración de Markdown (por si añadimos blog)
    markdown: {
        shikiConfig: {
            theme: 'github-dark',
            wrap: true,
        },
    },
});
