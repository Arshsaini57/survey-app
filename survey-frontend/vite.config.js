import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  esbuild: {
    loader: 'jsx', // This should be a string ('jsx'), not an object
  },
  plugins: [react()],
})
