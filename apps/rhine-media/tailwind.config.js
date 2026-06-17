const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
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
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1240px' },
    },
    screens: {
      sm: '540px',
      md: '768px',
      lg: '960px',
      xl: '1100px',
      '2xl': '1240px',
    },
    extend: {
      fontFamily: {
        head: ['"Manrope"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },

      fontSize: {
        hero: ["clamp(1.85rem, 3.5vw, 2.75rem)", { fontWeight: 800, letterSpacing: "-0.025rem" }],
        logo: [["1.125rem", { fontWeight: 800, letterSpacing: "-0.02rem" }]],
        "logo-mark": ["0.813rem", { fontWeight: 900, letterSpacing: "-0.02rem" }],
        body: ["1rem", { lineHeight: 1.75 }],
        link: ["0.85rem", { fontWeight: 500, letterSpacing: "0.01rem" }],
        "link-mob": ["1.6rem", { fontWeight: 700 }],
        eyebrow: ["0.75rem", { fontWeight: 700, letterSpacing: "0.14rem" }],
        button: ["0.875rem", { fontWeight: 700, letterSpacing: "0.01rem" }]
      },

      colors: {
        bg: {
          0: 'hsl(var(--bg-0) / <alpha-value>)',
          1: 'hsl(var(--bg-1) / <alpha-value>)',
          2: 'hsl(var(--bg-2) / <alpha-value>)',
          card: 'hsl(var(--bg-card) / <alpha-value>)',
          'card-h': 'hsl(var(--bg-card-h) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'hsl(var(--c-gold) / <alpha-value>)',
          lt: 'hsl(var(--c-gold-lt) / <alpha-value>)',
          dim: 'hsl(var(--c-gold) / 0.12)',
          glow: 'hsl(var(--c-gold) / 0.25)',
        },
        blue: {
          DEFAULT: 'hsl(var(--c-blue) / <alpha-value>)',
          lt: 'hsl(var(--c-blue-lt) / <alpha-value>)',
          dim: 'hsl(var(--c-blue) / 0.122)',
        },
        black: {
          DEFAULT: 'hsl(var(--c-black) / <alpha-value>)',
        },
        red: {
          DEFAULT: 'hsl(var(--c-red) / <alpha-value>)',
        },
        green: {
          DEFAULT: 'hsl(var(--c-green) / <alpha-value>)',
          lt: 'hsl(var(--c-green-lt) / <alpha-value>)',
        },
        text: {
          1: 'hsl(var(--t-1) / <alpha-value>)',
          2: 'hsl(var(--t-2) / <alpha-value>)',
          3: 'hsl(var(--t-3) / <alpha-value>)',
        },
        line: {
          soft: 'hsl(var(--c-white) / 0.04)',
          DEFAULT: 'hsl(var(--c-white) / 0.08)',
          gold: 'hsl(var(--c-gold) / 0.28)',
        },
      },

      backgroundImage: {
        'g-gold':
          'linear-gradient(90deg, hsl(var(--c-gold)) 0%, hsl(var(--c-gold-lt)) 100%)',
        'g-blue':
          'linear-gradient(90deg, hsl(var(--c-blue)) 0%, hsl(var(--c-blue-lt)) 100%)',
        'g-card':
          'linear-gradient(145deg, hsl(var(--c-white) / 0.03) 0%, transparent 100%)',
        'g-hero':
          'radial-gradient(ellipse 80% 60% at 70% 40%, hsl(var(--c-blue) / 0.08) 0%, transparent 70%)',
        'g-grid':
          'linear-gradient(hsl(var(--c-blue) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--c-blue) / 0.05) 1px, transparent 1px)'
      },

      boxShadow: {
        glow: '0 0.875rem 2.375rem hsl(var(--c-gold) / 0.25)',
        'glow-1': '0 0 0 3px hsl(var(--c-gold) / 0.1)',
      },

      maxWidth: {
        container: '1240px',
      },

      spacing: {
        section: 'var(--sec-py)',
        gutter: '1.5rem',
      },

      borderRadius: {
        'bs': '0.5rem',
        'bm': '0.875rem',
        'bl': '1.25rem',
        'bxl': '1.75rem',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      transitionDuration: {
        DEFAULT: '0.2s',
        med: '0.45s',
      },

      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },

      animation: {
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
