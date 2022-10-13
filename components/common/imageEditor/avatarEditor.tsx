import { useState, useCallback, useRef, useEffect } from 'react'
import { Box, Slider, Typography, Stack, useTheme } from '@mui/material'
import Cropper, { Area } from 'react-easy-crop'
import BasedTopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import useSnackbar from 'lib/application/ui/useSnackbar'
import { fileToDataURL, getCroppedImg, urlToDataURL } from 'lib/helper/image'
import Button from '../button/button'
import ConfirmButton from './confirmButton'
import type { Coordinate } from 'lib/domain/photo'

export interface CropResult {
  originAvatar: string // base64 object URL
  croppedAvatar: string // base64 object URL
  width: number
  height: number
  coordinate: Coordinate[]
}

const rotateMarks = [-180, -90, 0, 90, 180].map(value => ({
  value,
  label: `${value}°`
}))

interface ImageEditorProps {
  type: 'change' | 'edit'
  imgSrc: string
  aspect: number
  cropData?: {
    originWidth: number
    originHeight: number
    coordinate: Coordinate[]
  }
  onConfirm(result: CropResult): void
}

const ImageEditor = ({
  type,
  imgSrc,
  aspect,
  cropData,
  onConfirm
}: ImageEditorProps) => {
  const theme = useTheme()
  const snackbar = useSnackbar()
  const [selectedImage, setSelectedImage] = useState<string>(imgSrc)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
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

  useEffect(() => {
    let ignore = false
    if (!ignore) imageInputRef.current?.click()
    return () => {
      ignore = true
    }
  }, [])

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
        ]
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

  // const handleMediaLoaded = (media: MediaSize) => {
  //   const height = window.innerWidth * (media.height / media.width)
  //   setContainerHeight(height)
  // }

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        bgcolor: theme => theme.palette.dark3.main,
        alignItems: 'center'
      }}
    >
      <BasedTopNavigation position="sticky" thresholdHeight={185}>
        {() => (
          <Stack
            direction="row"
            sx={{
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 1,
              height: 1,
              px: '16px',
              backgroundColor: theme => theme.palette.dark3.main
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                width: '100%',
                height: '100%',
                justifySelf: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography
                variant="body1"
                color="light1"
                style={{
                  position: 'absolute',
                  margin: 'auto'
                }}
              >
                {type === 'change' ? '更換頭貼' : '編輯頭貼'}
              </Typography>
            </Box>
            <BackButton />
          </Stack>
        )}
      </BasedTopNavigation>
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: containerHeight
        }}
      >
        <Cropper
          image={selectedImage}
          aspect={aspect}
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
          // onMediaLoaded={handleMediaLoaded}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onRotationChange={setRotation}
          onZoomChange={setZoom}
        />
      </Box>
      <Box sx={{ p: '16px', width: 1 }}>
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
          valueLabelDisplay="auto"
          valueLabelFormat={v => `${v}°`}
          onChange={(_event: Event, newValue: number | number[]) => {
            setRotation(newValue as number)
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
          <ConfirmButton onClick={handleConfirm} />
        </Box>
      </Box>
      {type === 'change' && (
        <>
          <Button onClick={handleUpload}>上傳圖片</Button>
          <input
            id="upload"
            ref={imageInputRef}
            onChange={handleChange}
            accept="image/*"
            type="file"
            hidden
          />
        </>
      )}
    </Stack>
  )
}

export default ImageEditor
