import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import '@/style/index.scss'
import VueLazyload from "vue-lazyload"
import * as utils from "@/utils"

const app = createApp(App)
const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
app.use(router)
app.use(pinia)
app.use(VueLazyload, {
  loading: EMPTY_IMG,
  error: EMPTY_IMG,
})
app.config.globalProperties.$utils = utils
app.mount('#app')
