import request from '@/utils/request'

export const getMvDetail = (id: string) => request.get(`/mv/detail?mvid=${id}`)

export const getMvUrl = (id: string) => request.get(`/mv/url?id=${id}`)

export const getSimiMv = (id: string) => request.get(`/simi/mv?mvid=${id}`)

export const getAllMvs = (params: any) => request.get(`/mv/all`, {params}) 