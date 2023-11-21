export function getImgUrl(url: string, w: number, h: number) {
  if (!h) {
    h = w
  }
  url += `?param=${w}y${h}`
  return url
}