import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import jest from 'eslint-plugin-jest';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    ignores: ['dist'], // Ignored folders
  },
  js.configs.recommended, // Base recommended JavaScript rules
  tseslint.configs.recommended, // TypeScript plugin rules
  {
    files: ['**/*.{ts,tsx}'], // Rules for TypeScript files
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
      jest,
      'unused-imports': unusedImports,
    },
    rules: {
      // React hooks rules
      ...reactHooks.configs.recommended.rules,
      // React Refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Unused imports rules
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.{test.ts,test.tsx}'], // Rules for test files
    plugins: {
      jest,
    },
    rules: {
      // Jest plugin rules
      ...jest.configs.recommended.rules,
    },
  },
];
