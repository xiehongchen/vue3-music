/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2023-12-04 10:33:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-23 12:14:00
 * @FilePath: /vue3-music/src/store/index.ts
 * @Description: 
 * 认真学习每一天
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
// 持久化插件
store.use(piniaPluginPersistedstate)

export default store
