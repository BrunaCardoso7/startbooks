import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: ['7f69-177-107-31-247.ngrok-free.app']  // Adicione o host gerado pelo ngrok aqui
  }
})
