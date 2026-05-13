import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 4001,
    proxy: {
      '/trpc_api': {
        target: 'http://localhost:7000/trpc',
        rewrite: (path) => path.replace(/^\/trpc_api/, ''),
      },
    },
  },
});
