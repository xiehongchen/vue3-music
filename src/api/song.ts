import request from '@/utils/request'
import axios from '@/utils/axios'

// 获取音乐url
export const getSongUrl = (id: string) => request.get(`/song/url?id=${id}`)

// 获取音乐详情
export const getSongDetail = (ids: string) => request.get(`/song/detail?ids=${ids}`)

// 新歌速递
export const getTopSongs = (type: number) => request.get(`/top/song?type=${type}`)

// 相似音乐
export const getSimiSongs = (id: string) => request.get(`/simi/song?id=${id}`)

// 歌词
export const getLyric = (id: string) => axios.get({
  url: `/lyric?id=${id}`
})