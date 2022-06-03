/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import { Box, Dialog, Slider, Typography } from '@mui/material'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  PercentCrop
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import useSnackbar from 'lib/application/useSnackbar'
import Button from '../button/button'

const rotateMarks = [-180, -90, 0, 90, 180].map(value => ({
  value,
  label: `${value}°`
}))

const TO_RADIANS = Math.PI / 180

const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) =>
  centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  )

const getCroppedImage = (
  image: HTMLImageElement,
  crop: Crop,
  scale: number,
  rotate: number
): Promise<string> => {
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

  return new Promise<string>((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('canvas to blob failed'))
        return
      }
      const imageURL = window.URL.createObjectURL(blob)
      resolve(imageURL)
    }, 'image/jpeg')
  })
}

interface ImageEditorProps {
  imgSrc: string
  aspect: number
  onConfirm(objectURL: string): void
  onCancel(): void
}

const ImageEditor = ({
  imgSrc,
  aspect,
  onConfirm,
  onCancel
}: ImageEditorProps) => {
  const snackbar = useSnackbar()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)

  const handleConfirm = async () => {
    if (!imgRef.current || !completedCrop) return

    try {
      const objectURL = await getCroppedImage(
        imgRef.current,
        completedCrop,
        scale,
        rotate
      )
      onConfirm(objectURL)
    } catch {
      snackbar.error('crop failed')
    }
  }

  const handleChange = (_crop: PixelCrop, percentageCrop: PercentCrop) =>
    setCrop(percentageCrop)

  const handleComplete = (crop: PixelCrop) => setCompletedCrop(crop)

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, aspect))
  }

  return (
    <Dialog open>
      <ReactCrop
        crop={crop}
        aspect={aspect}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <img
          ref={imgRef}
          alt="Crop me"
          src={imgSrc}
          onLoad={handleImageLoad}
          style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
        />
      </ReactCrop>
      <Box sx={{ p: '16px' }}>
        <Typography variant="body2">Scale:</Typography>
        <Slider
          value={scale}
          min={1}
          max={5}
          step={0.1}
          onChange={(_event: Event, newValue: number | number[]) => {
            setScale(newValue as number)
          }}
        />
        <Typography variant="body2">Rotate:</Typography>
        <Slider
          value={rotate}
          min={-180}
          max={180}
          marks={rotateMarks}
          valueLabelDisplay="auto"
          valueLabelFormat={v => `${v}°`}
          onChange={(_event: Event, newValue: number | number[]) => {
            setRotate(newValue as number)
          }}
        />
        <Box
          sx={{
            mt: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            '& > *': { flex: 1 }
          }}
        >
          <Button onClick={onCancel}>取消</Button>
          <Button variant="outlined" onClick={handleConfirm}>
            確認
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ImageEditor
