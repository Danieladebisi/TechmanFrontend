import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  base: '/app/', // Ensures relative paths for assets
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});
