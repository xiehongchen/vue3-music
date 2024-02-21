/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-02-21 10:33:41
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-21 10:33:51
 * @FilePath: /vue3-music/src/api/songlist.ts
 * @Description: 
 * 认真学习每一天
 */
import request from '@/utils/request'

// 获取歌单
export const getListDetail = (params: any) => request.get('/playlist/detail', { params })