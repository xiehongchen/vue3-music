/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2023-12-04 10:33:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-21 17:31:56
 * @FilePath: /vue3-music/src/api/discovery.ts
 * @Description: 
 * 认真学习每一天
 */
import request from '@/utils/request'

export const getBanner = () => request.get('/banner?type=0')

export const getNewSongs = () => request.get('/personalized/newsong')

export const getPersonalized = (params: any) => request.get(`/personalized`, { params })

export const getPersonalizedMv = () => request.get(`/personalized/mv`)