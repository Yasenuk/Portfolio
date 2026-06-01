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
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        black: 'hsl(var(--black))',
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
      },
    },
  },
};
