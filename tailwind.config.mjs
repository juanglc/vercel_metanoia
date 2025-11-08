/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  // Dark mode con clase y data-attribute
  darkMode: ['class', '[data-theme="dark"]'],

  theme: {
    extend: {
      // Paleta de colores del Cuarteto Metanoia
      colors: {
        // Colores primarios (cambian según tema)
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: '#8B4513', // Marrón cálido (light mode)
          dark: '#D4AF37',  // Dorado (dark mode)
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light: '#D4AF37', // Dorado (light mode)
          dark: '#8B4513',  // Marrón (dark mode)
        },

        // Colores de fondo
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',

        // Colores de texto
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',

        // Colores adicionales
        accent: {
          cream: '#FFF8DC',
          brown: {
            50: '#FAF8F5',
            100: '#F5F1EB',
            200: '#E8DFD3',
            300: '#D4C4B0',
            400: '#B8A28A',
            500: '#8B4513',
            600: '#70370F',
            700: '#5C2D0C',
            800: '#4A240A',
            900: '#3D1E08',
          },
          gold: {
            50: '#FEFCF3',
            100: '#FEF9E7',
            200: '#FCF0C3',
            300: '#F9E79F',
            400: '#F4D03F',
            500: '#D4AF37',
            600: '#B8960F',
            700: '#967A0B',
            800: '#6B5709',
            900: '#4A3C06',
          },
        },
      },

      // Tipografía
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },

      // Typography scale optimizado
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
      },

      // Animaciones custom
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },

      // Spacing custom
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '100': '25rem',   // 400px
        '112': '28rem',   // 448px
        '128': '32rem',   // 512px
      },

      // Border radius
      borderRadius: {
        '4xl': '2rem',
      },

      // Box shadow custom
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 15px rgba(212, 175, 55, 0.3)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },

      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // Transitions
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class', // Solo aplicar estilos con clase 'form-*'
    }),
  ],
};
