const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const preset = require('@portfolio/tailwind-config/preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    './{src,pages,components,app}/**/!(*.stories|*.spec).{ts,tsx,js,jsx,html}',
    join(__dirname, '../../libs/**/src/**/!(*.stories|*.spec).{ts,tsx,js,jsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [],
};
