import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.tsx'],
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '.next/**',
        'out/**',
        'public/**',
        '*.config.ts',
        '*.config.js',
        '**/*.d.ts',
        'tests/**',
        'src/types/**',
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 40,
        statements: 60,
      },
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
