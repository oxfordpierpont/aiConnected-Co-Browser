import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Widget build configuration - produces a single IIFE bundle
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL || 'https://api.siteguide.io'),
      'process.env.WS_URL': JSON.stringify(env.WS_URL || 'wss://api.siteguide.io/ws'),
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/widget/index.tsx'),
        name: 'SiteGuide',
        fileName: () => 'siteguide.js',
        formats: ['iife'],
      },
      outDir: 'dist/widget',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          // Ensure all CSS is inlined
          assetFileNames: 'siteguide.[ext]',
        },
      },
      // Minify for production
      minify: mode === 'production' ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
