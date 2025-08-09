import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  return {
    plugins: [react()],
    base: '/dd-menu/',  // Match the repository name for GitHub Pages
    server: {
      port: 3009,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  };
})