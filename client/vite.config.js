import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load the correct .env file based on mode
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: [
        { find: '~', replacement: '/src' },
        { find: 'api', replacement: '/api' }
      ]
    },
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
      __ENCRYPT_DATA__: JSON.stringify(env.VITE_ENCRYPT_DATA)
    }
  }
})
