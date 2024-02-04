/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2023-12-04 10:33:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-04 10:58:46
 * @FilePath: /vue3-music/src/store/user.ts
 * @Description: 
 * 认真学习每一天
 */
import { getUserDetail, getUserPlaylist } from '@/api/user'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', () => {
  const state = reactive({
    // 用户信息
    userInfo: {} as any,
    // 是否登录
    isLogin: false,
    // 用户菜单
    userMenus: [],
    // 登录用户歌单
    userPlaylist: []
  })

  const userInfo = computed(() => state.userInfo)
  const isLogin = computed(() => state.isLogin)
  const userMenus = computed(() => state.userMenus)
  const userPlaylist = computed(() => state.userPlaylist)

  // 登录
  async function login(uid: string) {
    if (!uid) {
      ElMessage.error('uid错误，请重新输入！')
      return
    }
    try {
      const user: any = await getUserDetail(uid)
      saveUserInfo(user.profile)
    } catch (e) {
      return ElMessage.error('登录错误')
    }
    const { playlist }: any = await getUserPlaylist(uid)
    state.userPlaylist = playlist
  }

  // 加载数据，尝试从本地存储中恢复数据
  function loadWareHouse() {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      state.isLogin = true
      state.userInfo = JSON.parse(userInfo)
    }
  }
  // 用户数据保存到本地
  function saveUserInfo(form: any) {
    state.userInfo = form
    state.isLogin = true
    localStorage.setItem('userInfo', JSON.stringify(form))
  }
  // 本地删除用户数据
  function removeUserInfo() {
    state.isLogin = false
    localStorage.removeItem('userInfo')
  }
  // 获取用户歌单
  function getUserMenus () {
    const retMenus = []
    // 创建歌单
    const userCreateList: never[] = []
    // 收藏歌单
    const userCollectList: never[] = []

    state.userPlaylist.forEach(playlist => {
      const { userId } = playlist
      if (state.userInfo.userId === userId) {
        userCreateList.push(playlist)
      } else {
        userCollectList.push(playlist)
      }
    })

    const getPlaylistChildren = (playlist: any) => playlist.map((item: any) => ({
      path: `/playlist/${item.id}`,
      meta: {
        title: item.name,
        icon: "playlist-menu"
      },
    }))

    if (userCreateList.length) {
      retMenus.push({
        type: 'playlist',
        title: '创建的歌单',
        children: getPlaylistChildren(userCreateList)
      })
    }
    if (userCollectList.length) {
      retMenus.push({
        type: "playlist",
        title: "收藏的歌单",
        children: getPlaylistChildren(userCollectList)
      })
    }
    return retMenus
  }

    // 在创建 store 时加载数据
    loadWareHouse()
    getUserMenus()

  return {
    userInfo,
    isLogin,
    userPlaylist,
    userMenus,
    saveUserInfo,
    removeUserInfo,
    getUserMenus,
    login
  }
})