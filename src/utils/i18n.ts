/**
 * Internationalization Utilities
 * Sistema completo de i18n para Cuarteto Metanoia
 */

export type Locale = 'en' | 'es';

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALES: Locale[] = ['en', 'es'];

/**
 * Locale names in their native language
 */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

/**
 * URL paths by locale
 */
export const LOCALE_PATHS: Record<string, { en: string; es: string }> = {
  home: { en: '/', es: '/' },
  about: { en: '/about', es: '/about' },
  gallery: { en: '/gallery', es: '/gallery' },
  concerts: { en: '/concerts', es: '/concerts' },
  services: { en: '/services', es: '/services' },
  contact: { en: '/contact', es: '/contact' },
};

// ============================================
// ✅ VERSIÓN CORREGIDA - Import.meta.glob
// ============================================

/**
 * Load all JSON files at build time (eager)
 */
const contentModules = import.meta.glob<Record<string, any>>(
  '/src/content/i18n/**/*.json',
  { eager: true, import: 'default' }
);

/**
 * Get content from JSON files
 * @param locale - Current locale (en/es)
 * @param section - Section name (landing, about, concerts, etc.)
 * @returns Content object for the specified section
 */
export function getContent<T = any>(
  locale: Locale,
  section: string
): T {
  const key = `/src/content/i18n/${locale}/${section}.json`;

  // Try to get content for requested locale
  let content = contentModules[key];

  if (!content) {
    console.error(`Content not found: ${key}`);

    // Fallback to default locale
    if (locale !== DEFAULT_LOCALE) {
      const fallbackKey = `/src/content/i18n/${DEFAULT_LOCALE}/${section}.json`;
      content = contentModules[fallbackKey];

      if (content) {
        console.warn(`Using fallback content: ${fallbackKey}`);
      } else {
        console.error(`Fallback content also not found: ${fallbackKey}`);
      }
    }
  }

  // Return content or empty object
  return (content || {}) as T;
}

/**
 * Check if content exists for a locale/section
 */
export function hasContent(locale: Locale, section: string): boolean {
  const key = `/src/content/i18n/${locale}/${section}.json`;
  return key in contentModules;
}

/**
 * Get all available sections for a locale
 */
export function getAvailableSections(locale: Locale): string[] {
  const prefix = `/src/content/i18n/${locale}/`;
  return Object.keys(contentModules)
    .filter(key => key.startsWith(prefix))
    .map(key => {
      const filename = key.replace(prefix, '').replace('.json', '');
      return filename;
    });
}

// ============================================
// El resto de las funciones permanecen igual
// ============================================

/**
 * Get browser language preference
 */
export function getBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;

  const browserLang = navigator.language.toLowerCase();

  // Check for exact match
  if (browserLang === 'es' || browserLang.startsWith('es-')) {
    return 'es';
  }

  // Default to English
  return 'en';
}

/**
 * Get saved locale from localStorage
 */
export function getSavedLocale(): Locale | null {
  if (typeof localStorage === 'undefined') return null;

  const saved = localStorage.getItem('cuarteto-metanoia-locale');
  return saved && LOCALES.includes(saved as Locale) ? (saved as Locale) : null;
}

/**
 * Save locale to localStorage
 */
export function saveLocale(locale: Locale): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('cuarteto-metanoia-locale', locale);
}

/**
 * Get current locale (saved > browser > default)
 */
export function getCurrentLocale(): Locale {
  return getSavedLocale() ?? getBrowserLocale();
}

/**
 * Get localized path
 * @param path - Path key from LOCALE_PATHS
 * @param locale - Target locale
 * @returns Localized path with locale prefix
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  const paths = LOCALE_PATHS[path];
  if (!paths) {
    console.warn(`Path not found in LOCALE_PATHS: ${path}`);
    return `/${locale}${path}`;
  }
  return `/${locale}${paths[locale]}`;
}

/**
 * Get alternate locale
 */
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'es' : 'en';
}

/**
 * Get alternate URL for current page
 * @param currentPath - Current pathname
 * @param currentLocale - Current locale
 * @returns Alternate URL with switched locale
 */
export function getAlternateUrl(
  currentPath: string,
  currentLocale: Locale
): string {
  const alternateLang = getAlternateLocale(currentLocale);

  // Remove current locale from path
  let basePath = currentPath.replace(`/${currentLocale}`, '');

  // Remove trailing slash
  if (basePath.endsWith('/') && basePath.length > 1) {
    basePath = basePath.slice(0, -1);
  }

  // Find matching path in LOCALE_PATHS
  for (const [key, paths] of Object.entries(LOCALE_PATHS)) {
    if (paths[currentLocale] === basePath || paths[currentLocale] === basePath + '/') {
      return `/${alternateLang}${paths[alternateLang]}`;
    }
  }

  // Fallback: simple replacement
  return `/${alternateLang}${basePath}`;
}

/**
 * Format date according to locale
 */
export function formatDate(
  date: Date | string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  const localeCode = locale === 'es' ? 'es-CO' : 'en-US';

  return new Intl.DateTimeFormat(localeCode, defaultOptions).format(dateObj);
}

/**
 * Format number according to locale
 */
export function formatNumber(
  number: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  const localeCode = locale === 'es' ? 'es-CO' : 'en-US';
  return new Intl.NumberFormat(localeCode, options).format(number);
}

/**
 * Pluralize text based on count
 */
export function pluralize(
  count: number,
  singular: string,
  plural: string
): string {
  return count === 1 ? singular : plural;
}

/**
 * Common translations (used across the site)
 */
export const commonTranslations: Record<Locale, Record<string, string>> = {
  en: {
    readMore: 'Read More',
    learnMore: 'Learn More',
    viewAll: 'View All',
    backToHome: 'Back to Home',
    loading: 'Loading...',
    error: 'Error',
    notFound: 'Not Found',
    pageNotFound: 'Page Not Found',
    goHome: 'Go to Homepage',
    close: 'Close',
    open: 'Open',
    menu: 'Menu',
    search: 'Search',
    previous: 'Previous',
    next: 'Next',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    share: 'Share',
    download: 'Download',
    uploadFile: 'Upload File',
    chooseFile: 'Choose File',
  },
  es: {
    readMore: 'Leer Más',
    learnMore: 'Conocer Más',
    viewAll: 'Ver Todo',
    backToHome: 'Volver al Inicio',
    loading: 'Cargando...',
    error: 'Error',
    notFound: 'No Encontrado',
    pageNotFound: 'Página No Encontrada',
    goHome: 'Ir al Inicio',
    close: 'Cerrar',
    open: 'Abrir',
    menu: 'Menú',
    search: 'Buscar',
    previous: 'Anterior',
    next: 'Siguiente',
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    share: 'Compartir',
    download: 'Descargar',
    uploadFile: 'Subir Archivo',
    chooseFile: 'Elegir Archivo',
  },
};

/**
 * Get common translation
 */
export function t(key: string, locale: Locale): string {
  return commonTranslations[locale]?.[key] || key;
}

/**
 * Check if path is a locale-specific path
 */
export function isLocalePath(path: string): boolean {
  return LOCALES.some((locale) => path === `/${locale}` || path.startsWith(`/${locale}/`));
}

/**
 * Extract locale from path
 */
export function getLocaleFromPath(path: string): Locale | null {
  const match = path.match(/^\/(en|es)(\/|$)/);
  return match ? (match[1] as Locale) : null;
}
