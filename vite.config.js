import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'zhfp',
  plugins: [
    vue(),
  ],
  server: {
    hmr: true,     //启动热更新，就是更改了代码自动刷新页面
    port: 5173,    //自定义启动时的端口
    open: true,   //代表vite项目在启动时自动打开浏览器 
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
