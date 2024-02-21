import { getAlbum } from "@/api"

/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2023-12-04 10:33:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-02-21 10:48:41
 * @FilePath: /vue3-music/src/utils/utils.ts
 * @Description: 
 * 认真学习每一天
 */
export function getImgUrl(url: string, w: number, h: number = w) {
  url += `?param=${w}y${h}`
  return url
}

export function pad(num: any, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

export function createSong(song: any) {
  const { id, name, img, artists, duration, albumId, albumName,mvId, ...rest } = song

  return {
    id,
    name,
    img,
    artists,
    duration,
    albumName,
    url: getSongPlayUrl(song.id),
    artistsText: getArtistisText(artists),
    durationSecond: duration / 1000,
    // 专辑 如果需要额外请求封面的话必须加上
    albumId,
    // mv的id 如果有的话 会在songTable组件中加上mv链接。
    mvId,
    ...rest
  }
}

function getSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
export function getArtistisText(artists: []) {
  return (artists || []).map((item: {name: string}) => item.name).join('/')
}

export function formatNumber(number: number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}

export function formatTime(interval: number) {
  interval = interval | 0
  const minute = pad((interval / 60) | 0)
  const second = pad(interval % 60)
  return `${minute}:${second}`
}

export function getPageOffset(page: number, limit: number) {
  return page * limit
}

export async function getSongImg(id: string, albumId: string) {
  if (!id || !albumId) {
    return
  }
  const { songs }: any = await getAlbum(albumId)
  const { al: {picUrl} } = songs.find((item: any) => item.id === id) || {}
  return picUrl
}

export function shallowEqual(a: any, b: any, compareKey: string) {
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    let compareA = a[i]
    let compareB = b[i]
    if (compareKey) {
      compareA = compareA[compareKey]
      compareB = compareB[compareKey]
    }
    if (!Object.is(a[i], b[i])) {
      return false
    }
  }
  return true
}

export function formatDate(date: any, fmt = 'yyyy-MM-dd hh:mm:ss') {
  date = date instanceof Date ? date : new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o: { [key: string]: any } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str: string) {
  return ('00' + str).substr(str.length)
}