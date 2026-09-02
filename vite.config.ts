import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src")
    }
  },

  // 开发服务器
  server: {
    port: 9999,
  },

  // 构建
  build: {
    outDir: 'dist',
  }
})
