/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2023-12-04 10:33:37
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-01-30 14:37:44
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