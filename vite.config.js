import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.API_PORT || 3001}`,
        configure(proxy) {
          proxy.on('error', (_error, _request, response) => {
            if (response.headersSent || response.destroyed) return
            response.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' })
            response.end(JSON.stringify({
              error: 'The AI API is unavailable. Restart the app with npm run dev.',
            }))
          })
        },
      },
    },
  },
})
