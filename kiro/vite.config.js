import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Bored API does not send CORS headers, so the browser blocks direct
// requests from the dev server. We proxy /api/* through Vite (server-side,
// no CORS) to the real API instead.
const API_TARGET = 'https://bored-api.appbrewery.com'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
