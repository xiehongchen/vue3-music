import request from '@/utils/request'

export const getArtists = (id: string) => request.get(`/artists?id=${id}`)
