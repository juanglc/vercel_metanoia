/**
 * Theme Management Utility
 * Handles dark/light mode switching and persistence
 */

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'cuarteto-metanoia-theme';

/**
 * Get system preferred theme
 */
export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Get saved theme from localStorage
 */
export function getSavedTheme(): Theme | null {
  if (typeof window === 'undefined') return null;

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === 'light' || saved === 'dark' ? saved : null;
}

/**
 * Get current active theme (saved or system)
 */
export function getCurrentTheme(): Theme {
  return getSavedTheme() ?? getSystemTheme();
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;

  document.documentElement.setAttribute('data-theme', theme);

  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content',
      theme === 'dark' ? '#1a1a1a' : '#ffffff'
    );
  }
}

/**
 * Save theme to localStorage
 */
export function saveTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): Theme {
  const currentTheme = getCurrentTheme();
  const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';

  applyTheme(newTheme);
  saveTheme(newTheme);

  return newTheme;
}

/**
 * Initialize theme on page load
 * This should be called as early as possible to prevent FOUC
 */
export function initTheme(): void {
  const theme = getCurrentTheme();
  applyTheme(theme);
}

/**
 * Listen to system theme changes
 */
export function watchSystemTheme(callback: (theme: Theme) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handler = (e: MediaQueryListEvent) => {
    // Only update if user hasn't manually set a theme
    if (getSavedTheme() === null) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
      callback(newTheme);
    }
  };

  mediaQuery.addEventListener('change', handler);

  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handler);
}

/**
 * Inline script to prevent FOUC (Flash of Unstyled Content)
 * This should be injected in <head> before any content renders
 */
export const themeInitScript = `
(function() {
  const THEME_KEY = 'cuarteto-metanoia-theme';
  
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
      return null;
    }
  }
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#ffffff');
    }
  }
  
  // Apply theme immediately
  const theme = getSavedTheme() || getSystemTheme();
  applyTheme(theme);
})();
`;
