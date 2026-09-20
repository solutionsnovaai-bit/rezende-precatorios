import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  const url = new URL(env.VITE_SITE_URL || 'https://rezendeprecatorios.com.br')
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('VITE_SITE_URL deve usar HTTP ou HTTPS.')
  return {
  plugins: [react(), tailwindcss(), {
    name: 'rezende-social-metadata',
    transformIndexHtml: html => html.replaceAll('__SITE_ORIGIN__', url.origin),
  }],
  server: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['terminal.local'] },
  build: { target: 'es2022', sourcemap: false },
  }
})
