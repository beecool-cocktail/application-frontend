import { useState, useCallback } from 'react'
import { Box, Slider, Typography, Stack, useTheme } from '@mui/material'
import Cropper, { Area } from 'react-easy-crop'
import BasedTopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import useSnackbar from 'lib/application/hooks/ui/useSnackbar'
import {
  canvasToDataUrl,
  getCroppedImg,
  urlToDataURL
} from 'lib/application/utils/image'
import { EDIT_CONFIG } from 'lib/application/constants/image'
import ConfirmButton from './confirmButton'
import type { Coordinate, CropResult } from 'lib/domain/photo'

interface CocktailImageEditorProps {
  imgSrc: string
  cropData?: {
    originWidth: number
    originHeight: number
    coordinate: Coordinate[]
    rotation: number
  }
  onConfirm(result: CropResult): void
  onCancel(): void
}

const CocktailImageEditor = ({
  imgSrc,
  cropData,
  onConfirm,
  onCancel
}: CocktailImageEditorProps) => {
  const theme = useTheme()
  const snackbar = useSnackbar()
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(cropData?.rotation || 0)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const containerHeight =
    cropData && cropData.coordinate[1].x !== 0 && cropData.coordinate[1].y !== 0
      ? window.innerWidth * (cropData.originHeight / cropData.originWidth)
      : window.innerWidth * (1280 / 1920)

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return

    try {
      const croppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        rotation
      )
      if (!croppedImage) return

      const originImage = await urlToDataURL(imgSrc).then(webpImageSrc => {
        return new Promise<string>(resolve => {
          const img = new window.Image()
          img.src = webpImageSrc
          img.onload = async () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight

            const ctx = canvas.getContext('2d')
            if (!ctx) return

            ctx.drawImage(img, 0, 0)
            const dataUrl = await canvasToDataUrl(canvas, 'origin.jpg')
            resolve(dataUrl)
          }
        })
      })

      const { width, height, x, y } = croppedAreaPixels
      onConfirm({
        originImage,
        croppedImage,
        width,
        height,
        coordinate: [
          { x, y },
          { x: x + width, y: y + height }
        ],
        rotation
      })
    } catch (e) {
      console.error(e)
      snackbar.error('crop failed')
    }
  }

  const handleCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  return (
    <Stack
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        alignItems: 'center',
        bgcolor: theme => theme.palette.background.default
      }}
    >
      <BasedTopNavigation
        position="sticky"
        thresholdHeight={185}
        title="編輯照片"
        leftSlot={() => <BackButton onClick={onCancel} />}
      />
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: containerHeight
        }}
      >
        <Cropper
          image={imgSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          showGrid={false}
          initialCroppedAreaPixels={
            cropData &&
            cropData.coordinate[1].x !== 0 &&
            cropData.coordinate[1].y !== 0
              ? {
                  width: cropData.coordinate[1].x - cropData.coordinate[0].x,
                  height: cropData.coordinate[1].x - cropData.coordinate[0].x,
                  x: cropData.coordinate[0].x,
                  y: cropData.coordinate[0].y
                }
              : undefined
          }
          cropShape="rect"
          style={{
            cropAreaStyle: {
              border: `3px dashed ${theme.palette.light1.main}`
            }
          }}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onRotationChange={setRotation}
          onZoomChange={setZoom}
        />
      </Box>
      <Box sx={{ p: '32px', width: 1 }}>
        <Typography variant="body2">縮放</Typography>
        <Slider
          value={zoom}
          {...EDIT_CONFIG.scale}
          onChange={(_event: Event, newValue: number | number[]) => {
            setZoom(newValue as number)
          }}
        />
        <Typography variant="body2">旋轉</Typography>
        <Slider
          value={rotation}
          valueLabelDisplay="auto"
          valueLabelFormat={v => `${v}°`}
          {...EDIT_CONFIG.rotation}
          onChange={(_event: Event, newValue: number | number[]) => {
            setRotation(newValue as number)
          }}
        />
      </Box>
      <ConfirmButton onClick={handleConfirm} />
    </Stack>
  )
}

export default CocktailImageEditor
