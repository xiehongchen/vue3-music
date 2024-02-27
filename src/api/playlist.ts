/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-01-31 10:33:09
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-27 16:45:27
 * @FilePath: /vue3-music/src/api/playlist.ts
 * @Description: 
 * 认真学习每一天
 */
import request from '@/utils/request'

// 获取歌单
export const getPlaylists = (params: any) => request.get('/top/playlist', { params })
// 精品歌单
export const getTopPlaylists = (params: any) => request.get('/top/playlist/highquality', { params })
// 获取相似歌单
export const getSimiPlaylists = (params: any) => request.get(`/simi/playlist?id=${params.id}`, params)