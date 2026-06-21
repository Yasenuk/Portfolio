const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const { join } = require('path');
const preset = require('@portfolio/tailwind-config/preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    './{src,pages,components,app}/**/!(*.stories|*.spec).{ts,tsx,js,jsx,html}',
    join(
      __dirname,
      '../../libs/**/src/**/!(*.stories|*.spec).{ts,tsx,js,jsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '30px',
        sm: '50px',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      fontFamily: {
        display: ['"Space Mono"', 'monospace'],
        sans: ['"Work Sans"', 'sans-serif'],
      },

      fontSize: {
        h1: ['4.188rem', { lineHeight: '1.1' }],
        h2: ['3.188rem', { lineHeight: '1.1' }],
        h3: ['2.375rem', { lineHeight: '1.2' }],
        h4: ['1.75rem', { lineHeight: '1.4' }],
        h5: ['1.375rem', { lineHeight: '1.6' }],
        body: ['1rem', { fontWeight: '400', lineHeight: '1.4' }],
        caption: ['0.75rem', { fontWeight: '400', lineHeight: '1.1' }],
      },

      colors: {
        bg: 'hsl(var(--bg) / <alpha-value>)',
        'bg-secondary': 'hsl(var(--bg-secondary) / <alpha-value>)',
        label: 'hsl(var(--label) / <alpha-value>)',
        'label-grey': 'hsl(var(--label-grey) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        action: 'hsl(var(--action) / <alpha-value>)',
        success: 'hsl(var(--success) / <alpha-value>)',
        danger: 'hsl(var(--danger) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
      },

      backgroundImage: {
        'action-fade':
          'linear-gradient(to top, hsl(var(--action)), transparent 50%)',
      },

      borderRadius: {
        DEFAULT: '1.25rem',
      },

      backdropBlur: {
        DEFAULT: '0.938rem',
      },
    },
  },
  plugins: [],
};
