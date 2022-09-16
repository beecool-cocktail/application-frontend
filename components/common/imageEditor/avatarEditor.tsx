/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import { Box, Stack } from '@mui/material'
import ReactCrop, { Crop, PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import useSnackbar from 'lib/application/ui/useSnackbar'
import {
  centerAspectCrop,
  getCroppedImage,
  urlToDataURL
} from 'lib/helper/image'
import { Coordinate } from 'lib/domain/photo'
import Button from '../button/button'

export interface CropResult {
  originAvatar: string // base64 object URL
  croppedAvatar: string // base64 object URL
  width: number
  height: number
  coordinate: Coordinate[]
}

interface ImageEditorProps {
  imgSrc: string
  onConfirm(result: CropResult): void
}

const AvatarEditor = ({ imgSrc, onConfirm }: ImageEditorProps) => {
  const snackbar = useSnackbar()
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const aspect = 1

  const handleConfirm = async () => {
    if (!imgRef.current || !completedCrop) return

    try {
      const { width, height, naturalWidth, naturalHeight } = imgRef.current
      const scaleX = naturalWidth / width
      const scaleY = naturalHeight / height
      const cropX = completedCrop.x * scaleX
      const cropY = completedCrop.y * scaleY

      const coordinate = [
        { x: cropX, y: cropY },
        { x: cropX + naturalWidth, y: cropY + naturalHeight }
      ]

      const originAvatar = await urlToDataURL(imgSrc)
      const croppedAvatar = getCroppedImage(imgRef.current, completedCrop)

      const result = {
        originAvatar,
        croppedAvatar,
        width,
        height,
        coordinate
      }
      onConfirm(result)
    } catch (e) {
      console.error(e)
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
    <Stack>
      <Box sx={{ mt: '190px' }}>
        <ReactCrop
          crop={crop}
          circularCrop
          aspect={aspect}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <img
            ref={imgRef}
            alt="Origin Image"
            src={imgSrc}
            onLoad={handleImageLoad}
            crossOrigin="anonymous"
          />
        </ReactCrop>
      </Box>
      <Button size="large" sx={{ mt: '169px' }} onClick={handleConfirm}>
        確認
      </Button>
    </Stack>
  )
}

export default AvatarEditor
