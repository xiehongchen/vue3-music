export function getImgUrl(url: string, w: number, h: number = w) {
  url += `?param=${w}y${h}`
  return url
}