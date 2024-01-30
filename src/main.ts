/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2023-12-04 10:33:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-01-30 12:29:43
 * @FilePath: /vue3-music/src/main.ts
 * @Description: 
 * 认真学习每一天
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import '@/style/index.scss'
import VueLazyload from "vue-lazyload"
import * as utils from "@/utils"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
app.use(router)
app.use(pinia)
app.use(VueLazyload, {
  loading: EMPTY_IMG,
  error: EMPTY_IMG,
})
app.config.globalProperties.$utils = utils

app.mount('#app')
// 全局捕获promise错误
// window.addEventListener('unhandledrejection', function (event) {
//   event.preventDefault()
// })