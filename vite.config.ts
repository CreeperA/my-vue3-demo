import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    }),
    vueJsx({
      // 配置选项
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src') // 配置路径别名
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/variables.scss";' // 配置sass全局变量
      }
    }
  },
  server: {
    proxy: {
      // 字符串简写方法
      '/foo': 'http://localhost:4567/foo',
      // 选项写法
      '/admin': {
        target: 'https://shop.fed.lagou.com/api/admin', // 代理的目标地址
        /**
         * 代理服务是通过把 HTTP 的 requestHeader 的 origin 字段映射到
         * 代理的目标地址,此时的 origin 是 localhost:3000,为 true 时代理
         * 服务就会把 origin 修改为 目标地址 https://shop.fed.lagou.com/api
         */
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/admin/, '')
      }
    }
  }
})
