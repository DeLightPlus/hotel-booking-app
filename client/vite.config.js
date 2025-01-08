import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules:{
      localsConvention: 'camelCase'
    }
  },
  server:{
    port: 5173,
    proxy:{
      "/paypal": "http://127.0.0.1:3000/"
    }
  }
})
