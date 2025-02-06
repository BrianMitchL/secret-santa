import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    files: ['**/*{spec,test}.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...testingLibrary.configs['flat/react'],
  },
  eslintConfigPrettier
);
