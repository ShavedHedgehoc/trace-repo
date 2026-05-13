// import js from '@eslint/js';
// import globals from 'globals';
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
// import tseslint from 'typescript-eslint';
// import { defineConfig, globalIgnores } from 'eslint/config';

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     rules: {
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         {
//           argsIgnorePattern: '^_',
//           varsIgnorePattern: '^_',
//         },
//       ],
//     },
//   },
// ]);

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // 1. Глобальные игноры
  globalIgnores(['dist']),

  // 2. Базовые рекомендуемые плагины и конфигурации
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Специфичные настройки для ваших TypeScript и React файлов
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // Объединяем правила из плагинов вручную (так как flat config ожидает плоскую структуру)
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Наше кастомное правило, которое теперь ПЕРЕЗАПИСЫВАЕТ стандартные
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_', // Игнорировать неиспользуемые переменные ошибок в catch (_e)
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
