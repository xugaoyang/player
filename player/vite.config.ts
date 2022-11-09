import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'types'),
    },
  },
  plugins: [WindiCSS(), vue()]
})
