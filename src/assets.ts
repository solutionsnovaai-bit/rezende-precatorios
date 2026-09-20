export function imageSrcSet(name: string) {
  return `/images/${name}-640.webp 640w, /images/${name}-960.webp 960w, /images/${name}.webp 1448w`
}

export const gallerySizes = '(max-width: 768px) 100vw, (max-width: 1200px) calc(91.1vw - 320px), calc(91.1vw - 350px)'
export const aboutSizes = '(max-width: 768px) calc(100vw - 61px), (max-width: 1400px) 42vw, 570px'
