const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const preset = require('@portfolio/tailwind-config/preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    join(__dirname, '{src,pages,components,app}/**/!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        base: ['0.875rem', {
          lineHeight: '1.25rem',
        }],
        lg: ['1.25rem', {
          lineHeight: '1.5rem',
        }]
      },
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        dark: 'hsl(var(--dark))',
        text: 'hsl(var(--text))',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.25rem',
          md: '1.5rem',
          lg: '1.75rem',
          xl: '2rem',
          '2xl': '2.25rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        }
      },
    },
  },
};
