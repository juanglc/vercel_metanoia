/**
 * Script para procesar y optimizar logos del Cuarteto Metanoia
 * Convierte JPGs a PNG/SVG y genera todos los tamaños necesarios
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const INPUT_DIR = './logos-source'; // Carpeta con tus JPGs originales
const OUTPUT_DIR = './public';

const SIZES = {
  favicon: {
    '16x16': { width: 16, height: 16 },
    '32x32': { width: 32, height: 32 },
  },
  icons: {
    'apple-touch-icon': { width: 180, height: 180 },
    'android-chrome-192': { width: 192, height: 192 },
    'android-chrome-512': { width: 512, height: 512 },
  },
  logos: {
    'header': { width: 180, height: 60 },
    'footer': { width: 120, height: 40 },
  },
};

async function getImage(baseName) {
  const jpg = path.join(INPUT_DIR, `${baseName}.jpg`);
  const png = path.join(INPUT_DIR, `${baseName}.png`);

  try {
    await fs.access(jpg);
    return sharp(jpg);
  } catch {}

  try {
    await fs.access(png);
    return sharp(png);
  } catch {}

  throw new Error(`No se encontró ni ${baseName}.jpg ni ${baseName}.png en logos-source`);
}


async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function processSymbols() {
  console.log('🎻 Procesando símbolos (violín)...\n');

  await ensureDir(path.join(OUTPUT_DIR, 'favicons'));

  // Procesar violín negro (light mode)
  const symbolLight = await getImage('Metanoia-10');

  // Favicon 32x32
  await symbolLight
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicons', 'favicon-32x32.png'));
  console.log('✅ favicon-32x32.png');

  // Favicon 16x16
  await symbolLight
    .clone()
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicons', 'favicon-16x16.png'));
  console.log('✅ favicon-16x16.png');

  // Apple Touch Icon
  await symbolLight
    .clone()
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicons', 'apple-touch-icon.png'));
  console.log('✅ apple-touch-icon.png');

  // Android Chrome 192x192
  await symbolLight
    .clone()
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicons', 'android-chrome-192x192.png'));
  console.log('✅ android-chrome-192x192.png');

  // Android Chrome 512x512
  await symbolLight
    .clone()
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicons', 'android-chrome-512x512.png'));
  console.log('✅ android-chrome-512x512.png\n');
}

async function processLogos() {
  console.log('🎨 Procesando logos completos...\n');

  await ensureDir(path.join(OUTPUT_DIR, 'logos'));

  // Logo negro (light mode)
  const logoLight = await getImage('Metanoia-9');

  // Header size
  await logoLight
    .resize(360, null, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'logos', 'logo-light.png'));
  console.log('✅ logo-light.png');

  // Logo blanco (dark mode)
  const logoDark = await getImage('Metanoia-9-BLANCO');

  await logoDark
    .resize(360, null, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'logos', 'logo-dark.png'));
  console.log('✅ logo-dark.png');

  // Símbolos individuales
  const symbolLight = await getImage('Metanoia-10');
  await symbolLight
    .resize(120, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'logos', 'symbol-light.png'));
  console.log('✅ symbol-light.png');

  const symbolDark = await getImage('Metanoia-10-BLANCO');
  await symbolDark
    .resize(120, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'logos', 'symbol-dark.png'));
  console.log('✅ symbol-dark.png\n');
}

async function generateSVGFavicon() {
  console.log('🎯 Generando favicon.svg adaptivo...\n');

  // SVG que cambia color según tema
  const faviconSVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    @media (prefers-color-scheme: dark) {
      .fill { fill: #D4AF37; }
    }
    @media (prefers-color-scheme: light) {
      .fill { fill: #8B4513; }
    }
  </style>
  <!-- Simplified violin icon -->
  <path class="fill" d="M12 4C12 4 10 6 10 8C10 10 12 12 14 14L18 18C20 20 22 22 22 24C22 26 20 28 20 28L22 28C22 28 24 26 24 24C24 22 22 20 20 18L16 14C14 12 12 10 12 8C12 6 14 4 14 4L12 4Z"/>
  <circle class="fill" cx="20" cy="24" r="2"/>
  <path class="fill" d="M13 7L19 13" stroke="currentColor" stroke-width="1"/>
</svg>`;

  await fs.writeFile(
    path.join(OUTPUT_DIR, 'favicon.svg'),
    faviconSVG
  );
  console.log('✅ favicon.svg (adaptivo light/dark)\n');
}

async function generateWebManifest() {
  console.log('📱 Generando site.webmanifest...\n');

  const manifest = {
    name: 'Cuarteto Metanoia',
    short_name: 'Metanoia',
    description: 'Cuarteto de cuerdas de música clásica',
    icons: [
      {
        src: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#8B4513',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
  };

  await fs.writeFile(
    path.join(OUTPUT_DIR, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('✅ site.webmanifest\n');
}

async function main() {
  console.log('🚀 Iniciando procesamiento de logos...\n');

  try {
    await processSymbols();
    await processLogos();
    await generateSVGFavicon();
    await generateWebManifest();

    console.log('✨ ¡Proceso completado exitosamente!\n');
    console.log('📂 Archivos generados en:');
    console.log('   - public/favicons/');
    console.log('   - public/logos/');
    console.log('   - public/favicon.svg');
    console.log('   - public/site.webmanifest\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
