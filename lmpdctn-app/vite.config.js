import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Headers de sécurité pour le serveur de développement
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://i.pinimg.com https://images.unsplash.com; font-src 'self'; connect-src 'self';",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },
  build: {
    // Désactiver les sourcemaps en production pour éviter d'exposer le code source
    sourcemap: false,
    // Utiliser le minifier natif esbuild pour éviter une dépendance terser optionnelle
    minify: 'esbuild'
  }
})
