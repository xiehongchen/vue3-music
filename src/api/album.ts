import request from "@/utils/axios"

export const getAlbum = (id: string) => request.get({
  url: `/album?id=${id}`
})