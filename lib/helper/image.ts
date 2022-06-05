import { centerCrop, Crop, makeAspectCrop } from 'react-image-crop'

const TO_RADIANS = Math.PI / 180

export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

export const toBase64Photos = async (fileList: FileList): Promise<string[]> => {
  const promiseObjs = Array.from(fileList).map(toBase64)
  return Promise.all(promiseObjs)
}

export const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) =>
  centerCrop(
    makeAspectCrop({ unit: '%', width: 100 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  )

export const getCroppedImage = (
  image: HTMLImageElement,
  crop: Crop,
  scale = 1,
  rotate = 0
): string => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No 2d context')

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 3) Rotate around the origin
  ctx.rotate(rotateRads)
  // 2) Scale the image
  ctx.scale(scale, scale)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  )

  return canvas.toDataURL('image/png', 1)
}
