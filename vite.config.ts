/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/secret-santa/',
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    coverage: {
      reporter: ['clover', 'json', 'lcov', 'text'],
      exclude: [
        '**/__mocks__/**',
        '**/*.{spec,test}.{ts,tsx}',
        'src/setupTests.ts',
      ],
    },
  },
});
