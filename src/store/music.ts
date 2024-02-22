/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-02-04 11:02:08
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-22 17:59:24
 * @FilePath: /vue3-music/src/store/music.ts
 * @Description: 
 * 认真学习每一天
 */

import { getSongImg, shallowEqual } from "@/utils";
import { playModeMap } from "@/utils/config";
import { defineStore } from "pinia";
interface songType {
  img?: string
}
export const useMusicStore = defineStore('music', () => {
  const state = reactive({
    // 当前播放歌曲
    currentSong: {} as songType,
    // 当前播放时长
    currentTime: 0,
    // 播放状态
    playing: false,
    // 播放模式
    playMode: playModeMap.sequence.code,
    // 播放列表显示
    isPlaylistShow: false,
    // 播放提示显示
    isPlaylistPromptShow: false,
    // 歌曲详情页显示
    isPlayerShow: false,
    // 播放列表数据
    playlist: [],
    // 播放历史数据
    playHistory: JSON.stringify(localStorage.getItem('history-list')) || [],
    // 菜单显示
    isMenuShow: true,
  })

  // 整合歌曲信息 并且开始播放
  async function startSong(rawSong: any) {
    // 浅拷贝一份 改变引用
    // 1.不污染元数据
    // 2.单曲循环为了触发watch
    const song = Object.assign({}, rawSong)
    if (!song.img) {
      if (song.albumId) {
        song.img = await getSongImg(song.id, song.albumId)
      }
    }
    state.currentSong = song
    state.playing = true
  }

  function clearCurrentSong () {
    state.currentSong = {}
    state.playing = false
    state.currentTime = 0
  }

  function setPlaylist (list: []) {
    const oldPlaylist = JSON.parse(JSON.stringify(state.playlist))
    state.playlist = list
    if (!state.isPlaylistPromptShow && shallowEqual(oldPlaylist, list, 'id')){
      state.isPlaylistPromptShow = true
      setTimeout(() => {
        state.isPlaylistPromptShow = false
      }, 2000)
    }
  }
  function clearPlaylist() {
    setPlaylist([])
    clearCurrentSong()
  }

  function clearHistory() {
    state.playHistory = []
    localStorage.setItem('history-list', '')
  }
  
  function addToPlaylist (song: any) {
    const copy = state.playlist as any[]
    if (!copy.find((item: {id: string}) => item.id === song.id)) {
      copy.unshift(song)
    }
  }

  const currentSong = computed(() => state.currentSong)

  return {
    currentSong,
    startSong,
    clearCurrentSong,
    setPlaylist,
    clearPlaylist,
    clearHistory,
    addToPlaylist,
  }
})