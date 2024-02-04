import request from "@/utils/request"

export const getAlbum = (id: string) => request.get(`/album?id=${id}`)