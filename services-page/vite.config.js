import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Build outputs to dist/ with relative base so we can copy to Aivora
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets/services-app',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/services-app/[name]-[hash].js',
        chunkFileNames: 'assets/services-app/[name]-[hash].js',
        assetFileNames: 'assets/services-app/[name]-[hash][extname]',
      },
    },
  },
})
