// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://anjaneyainnovations.com',
  compressHTML: true,
  output: 'static',
  build: {
    assets: 'assets',
    inlineStylesheets: 'never'
  },
  // Use standard viewTransitions integration
  viewTransitions: true,
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Enable content hashing for cache busting
          entryFileNames: 'assets/js/[name].[hash].js',
          chunkFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
        }
      },
      // Minimize JS and CSS
      minify: 'terser',
      cssMinify: true
    },
    // Optimize images during build
    plugins: []
  }
}); 