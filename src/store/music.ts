/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-02-04 11:02:08
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-27 18:10:53
 * @FilePath: /vue3-music/src/store/music.ts
 * @Description: 
 * 认真学习每一天
 */

import { getSongImg, shallowEqual } from "@/utils";
import { playModeMap } from "@/utils/config";
import { defineStore } from "pinia";
interface songType {
  img?: string
  id?: string
  name?: string
  artistsText?: string
  duration?: number
  mvId?: string
  url?: string
}
interface musicState {
  currentSong: songType
  currentTime: number
  playing: boolean
  playMode: string
  isPlaylistShow: boolean
  isPlaylistPromptShow: boolean
  isPlayerShow: boolean
  playlist: any[]
  playHistoryList: any[]
  isMenuShow: boolean
  audioElement: HTMLAudioElement | null
}
export const useMusicStore = defineStore('music', {
  state: (): musicState => ({
    // 当前播放歌曲
    currentSong: {},
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
    playHistoryList: [],
    // 菜单显示
    isMenuShow: true,
    // 播放器
    audioElement: null
  }),
  getters: {
    // 当前是否有歌曲
    hasCurrentSong(state): boolean {
      return state.currentSong.id !== undefined
    },
    // 下一首
    nextSong(state): songType {
      const index = state.playlist.findIndex((item: {id: string}) => item.id === state.currentSong.id)
      let nextIndex = index + 1
      if (nextIndex === state.playlist.length) {
        nextIndex = 0
      }
      return state.playlist[nextIndex]
    },
    // 上一首
    prevSong(state): songType {
      const index = state.playlist.findIndex((item: {id: string}) => item.id === state.currentSong.id)
      let prevIndex = index - 1
      if (prevIndex === -1) {
        prevIndex = state.playlist.length - 1
      }
      return state.playlist[prevIndex]
    }
  },
  actions: {
    // 整合歌曲信息 并且开始播放
    async startSong(rawSong: any) {
      // 浅拷贝一份 改变引用
      // 1.不污染元数据
      // 2.单曲循环为了触发watch
      const song = Object.assign({}, rawSong)
      if (!song.img) {
        if (song.albumId) {
          song.img = await getSongImg(song.id, song.albumId)
        }
      }
      this.currentSong = song
      this.playing = true
      const isAddHistory = this.playHistoryList.find((song: songType) => song.id === this.currentSong.id)
      if (!isAddHistory) {
        if (this.playHistoryList.length > 20) {
          this.playHistoryList.pop()
          this.playHistoryList.push(this.currentSong)
        } else {
          this.playHistoryList.push(this.currentSong)
        }
      }
    },
    clearCurrentSong () {
      this.currentSong = {}
      this.playing = false
      this.currentTime = 0
    },
    setPlaylist (list: []) {
      const oldPlaylist = JSON.parse(JSON.stringify(this.playlist))
      this.playlist = list
      if (!this.isPlaylistPromptShow && shallowEqual(oldPlaylist, list, 'id')){
        this.isPlaylistPromptShow = true
        setTimeout(() => {
          this.isPlaylistPromptShow = false
        }, 2000)
      }
    },
    clearPlaylist() {
      this.setPlaylist([])
      this.clearCurrentSong()
    },
    clearHistory() {
      this.playHistoryList = []
    },
    addToPlaylist (song: any) {
      const copy = this.playlist as any[]
      if (!copy.find((item: {id: string}) => item.id === song.id)) {
        copy.unshift(song)
      }
    }
  },
  persist: true
})