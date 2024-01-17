/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2023-12-04 10:33:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-01-17 11:37:38
 * @FilePath: /vue3-music/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-imports.d.ts',
        eslintrc: { enabled: true },
      }),
      Components({
        // 按需引入
        dts: true,
        dirs: ["src/base", "src/components"],
        resolvers:[
          VantResolver()
        ]
      })
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `
            @import "./src/style/variable.scss";
            @import "./src/style/mixin.scss";
          `
        }
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://mu-api.yuk0.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
