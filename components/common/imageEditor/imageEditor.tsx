/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import { Box, Dialog, Slider, Typography } from '@mui/material'
import ReactCrop, { Crop, PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import useSnackbar from 'lib/application/ui/useSnackbar'
import { centerAspectCrop, getCroppedImage } from 'lib/helper/image'
import Button from '../button/button'

const rotateMarks = [-180, -90, 0, 90, 180].map(value => ({
  value,
  label: `${value}°`
}))

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

  const handleConfirm = () => {
    if (!imgRef.current || !completedCrop) return

    try {
      const objectURL = getCroppedImage(
        imgRef.current,
        completedCrop,
        scale,
        rotate
      )
      onConfirm(objectURL)
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
          crossOrigin="anonymous"
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
