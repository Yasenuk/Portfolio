const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Mono"', 'monospace'],
        sans:    ['"Work Sans"', 'sans-serif'],
      },

      fontSize: {
        h1: ['4.188rem',     { lineHeight: '1.1' }],
        h2: ['3.188rem',     { lineHeight: '1.1' }],
        h3: ['2.375rem',     { lineHeight: '1.2' }],
        h4: ['1.75rem',      { lineHeight: '1.4' }],
        h5: ['1.375rem',     { lineHeight: '1.6' }],
        h6: ['rem',          { lineHeight: '1.4' }],
        caption: ['0.75rem', { lineHeight: '1.1' }],
      },

      colors: {
        bg: 'hsl(var(--bg) / <alpha-value>)',
        'bg-secondary': 'hsl(var(--bg-secondary) / <alpha-value>)',
        cation: 'hsl(var(--cation) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        action: 'hsl(var(--action) / <alpha-value>)'
      },

      borderRadius: {
        avatar: '50%',
        button: '1.25rem'
      }
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.font-display': {
          fontFamily: theme('fontFamily.display').join(', '),
          fontWeight: '700',
        },
        '.font-sans': {
          fontFamily: theme('fontFamily.sans').join(', '),
          fontWeight: '600',
        },
      });
    }),
  ],
};
