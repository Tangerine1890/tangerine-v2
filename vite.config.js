import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/tangerine-v2/' : '/',
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress',
      filter: (file) => file.endsWith('.js') || file.endsWith('.css'),
      deleteOriginFile: false,
    }),
    visualizer({
      filename: 'dist/stats.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
  build: {
    target: 'es2019',
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
}));
