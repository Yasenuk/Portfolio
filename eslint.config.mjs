import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vite.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            // shared/* може залежати тільки від інших shared/*
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // app-specific libs можуть залежати від shared і від свого scope
            // {
            //   sourceTag: 'scope:{app}',
            //   onlyDependOnLibsWithTags: ['scope:shared', 'scope:{app}'],
            // },
            {
              sourceTag: 'scope:aperture',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:aperture'],
            },
            // type:ui може залежати від utils, types, hooks
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:utils',
                'type:types',
                'type:hooks',
              ],
            },
            // type:hooks може залежати від utils і types
            {
              sourceTag: 'type:hooks',
              onlyDependOnLibsWithTags: ['type:hooks', 'type:utils', 'type:types'],
            },
            // type:utils — тільки від types (без React)
            {
              sourceTag: 'type:utils',
              onlyDependOnLibsWithTags: ['type:utils', 'type:types'],
            },
            // type:types — нічого не імпортує
            {
              sourceTag: 'type:types',
              onlyDependOnLibsWithTags: ['type:types'],
            },
            // server-only не може потрапити в client-side libs
            {
              sourceTag: 'type:ui',
              bannedExternalImports: ['@portfolio/shared/database'],
            },
            {
              sourceTag: 'type:hooks',
              bannedExternalImports: ['@portfolio/shared/database'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {},
  },
];
