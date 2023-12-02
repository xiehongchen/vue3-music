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

  // 加载数据，尝试从本地存储中恢复数据
  function loadWareHouse() {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      state.isLogin = true
      state.userInfo = JSON.parse(userInfo)
    }
  }
  function setUserPlaylist(playlist: any) {
    state.userPlaylist = playlist
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
    setUserPlaylist,
    userMenus,
    saveUserInfo,
    removeUserInfo,
    getUserMenus,
  }
})