# @portfolio/tailwind-config

Shared Tailwind preset і PostCSS config для всіх apps у монорепо.

## Підключення в React+Vite app

```js
// apps/my-app/tailwind.config.js
const preset = require('@portfolio/tailwind-config/preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../libs/shared/ui/src/**/*.{ts,tsx}',
    // додай libs специфічні для цього app:
    // '../../libs/my-app/**/*.{ts,tsx}',
  ],
};
```

```js
// apps/my-app/postcss.config.js
module.exports = require('@portfolio/tailwind-config/postcss');
```

## Підключення в Next.js app

```js
// apps/my-nextjs-app/tailwind.config.js
const preset = require('@portfolio/tailwind-config/preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    '../../libs/shared/ui/src/**/*.{ts,tsx}',
  ],
};
```

```js
// apps/my-nextjs-app/postcss.config.js
// Next.js підхоплює цей файл автоматично
module.exports = require('@portfolio/tailwind-config/postcss');
```

## CSS змінні

Підключи globals.css з shared/ui в root layout:

```tsx
// apps/my-nextjs-app/src/app/layout.tsx
import '@portfolio/shared-ui/src/styles/globals.css';
```

```tsx
// apps/my-react-app/src/main.tsx
import '@portfolio/shared-ui/src/styles/globals.css';
```
