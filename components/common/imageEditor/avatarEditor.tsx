import { useState, useCallback, useRef } from 'react'
import { Box, Slider, Typography, Stack, useTheme } from '@mui/material'
import Cropper, { Area } from 'react-easy-crop'
import BasedTopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import useSnackbar from 'lib/application/ui/useSnackbar'
import { fileToDataURL, getCroppedImg, urlToDataURL } from 'lib/helper/image'
import ConfirmButton from './confirmButton'
import type { Coordinate } from 'lib/domain/photo'

export interface CropResult {
  originAvatar: string // base64 object URL
  croppedAvatar: string // base64 object URL
  width: number
  height: number
  coordinate: Coordinate[]
  rotation: number
}

const rotateMarks = [-180, -90, 0, 90, 180].map(value => ({
  value,
  label: `${value}°`
}))

interface ImageEditorProps {
  type: 'change' | 'edit'
  imgSrc: string
  cropData?: {
    originWidth: number
    originHeight: number
    coordinate: Coordinate[]
    rotation: number
  }
  onConfirm(result: CropResult): void
}

const ImageEditor = ({
  type,
  imgSrc,
  cropData,
  onConfirm
}: ImageEditorProps) => {
  const theme = useTheme()
  const snackbar = useSnackbar()
  const [selectedImage, setSelectedImage] = useState<string>(imgSrc)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(cropData?.rotation || 0)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [raw, setRaw] = useState(true)
  const [containerHeight, setContainerHeight] = useState(() => {
    return cropData &&
      cropData.coordinate[1].x !== 0 &&
      cropData.coordinate[1].y !== 0
      ? window.innerWidth * (cropData.originHeight / cropData.originWidth)
      : window.innerWidth * (1280 / 1920)
  })
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async e => {
    if (!e.target.files) return
    const imgSrc = URL.createObjectURL(e.target.files[0])

    const img = new Image()
    img.src = imgSrc
    img.onload = () => {
      img.naturalWidth
      const height = window.innerWidth * (img.naturalHeight / img.naturalWidth)
      setContainerHeight(height)
      setRaw(false)
      setSelectedImage(imgSrc)
      setZoom(1)
      setRotation(0)
      setCrop({ x: 0, y: 0 })
    }
  }

  const handleUpload = () => {
    imageInputRef.current?.click()
  }

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return

    try {
      const croppedAvatar = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      )
      if (!croppedAvatar) return

      const originAvatar = await urlToDataURL(selectedImage).then(
        webpImageSrc => {
          return new Promise<string>(resolve => {
            const img = new window.Image()
            img.src = webpImageSrc
            img.onload = () => {
              const canvas = document.createElement('canvas')
              canvas.width = img.naturalWidth
              canvas.height = img.naturalHeight

              const ctx = canvas.getContext('2d')
              if (!ctx) return

              ctx.drawImage(img, 0, 0)
              canvas.toBlob(blob => {
                if (!blob) return
                const myImage = new File([blob], 'origin-avatar.png', {
                  type: blob.type
                })
                resolve(fileToDataURL(myImage))
              }, 'image/png')
            }
          })
        }
      )

      const { width, height, x, y } = croppedAreaPixels
      onConfirm({
        originAvatar,
        croppedAvatar,
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
    <Stack sx={{ alignItems: 'center' }}>
      <BasedTopNavigation
        position="sticky"
        thresholdHeight={185}
        title={() => (type === 'change' ? '更換頭貼' : '編輯頭貼')}
        leftSlot={() => <BackButton />}
        rightSlot={() => {
          if (type === 'change') {
            return (
              <>
                <Typography
                  variant="body2"
                  color={theme => theme.palette.blue.main}
                  sx={{ cursor: 'pointer' }}
                  onClick={handleUpload}
                >
                  選取
                </Typography>
                <input
                  id="upload"
                  ref={imageInputRef}
                  onChange={handleChange}
                  accept="image/*"
                  type="file"
                  hidden
                />
              </>
            )
          }
        }}
      />
      <Box
        sx={{
          position: 'relative',
          mt: '12px',
          width: '100%',
          height: containerHeight
        }}
      >
        <Cropper
          image={selectedImage}
          aspect={1}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          showGrid={false}
          initialCroppedAreaPixels={
            cropData &&
            raw &&
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
          cropShape="round"
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
      {type === 'edit' && (
        <Box sx={{ p: '32px', width: 1 }}>
          <Typography variant="body2">縮放</Typography>
          <Slider
            value={zoom}
            min={1}
            max={5}
            step={0.1}
            onChange={(_event: Event, newValue: number | number[]) => {
              setZoom(newValue as number)
            }}
          />
          <Typography variant="body2">旋轉</Typography>
          <Slider
            value={rotation}
            min={-180}
            max={180}
            marks={rotateMarks}
            step={90}
            valueLabelDisplay="auto"
            valueLabelFormat={v => `${v}°`}
            onChange={(_event: Event, newValue: number | number[]) => {
              setRotation(newValue as number)
            }}
          />
        </Box>
      )}
      <ConfirmButton onClick={handleConfirm} />
    </Stack>
  )
}

export default ImageEditor
