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
