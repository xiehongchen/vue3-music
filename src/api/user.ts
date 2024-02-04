import request from '@/utils/request'

export const getUserDetail = (uid: string) => request.get("/user/detail", { params: { uid } })

const PLAYLIST_LIMIT = 1000
export const getUserPlaylist = (uid: string) => request.get("/user/playlist", { params: { uid, limit: PLAYLIST_LIMIT } })