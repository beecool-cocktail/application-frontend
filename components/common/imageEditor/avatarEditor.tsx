import { useState, useCallback, useRef } from 'react'
import { Box, Slider, Typography, Stack, useTheme } from '@mui/material'
import Cropper, { Area } from 'react-easy-crop'
import BasedTopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import useSnackbar from 'lib/application/ui/useSnackbar'
import { canvasToDataUrl, getCroppedImg, urlToDataURL } from 'lib/helper/image'
import { EDIT_CONFIG } from 'lib/constants/image'
import snackbarMessages from 'lib/constants/snackbarMessages'
import ConfirmButton from './confirmButton'
import type { Coordinate, CropResult, EditorType } from 'lib/domain/photo'

interface AvatarEditorProps {
  type: EditorType
  imgSrc: string
  cropData?: {
    originWidth: number
    originHeight: number
    coordinate: Coordinate[]
    rotation: number
  }
  onConfirm(result: CropResult): void
}

const AvatarEditor = ({
  type,
  imgSrc,
  cropData,
  onConfirm
}: AvatarEditorProps) => {
  const theme = useTheme()
  const snackbar = useSnackbar()
  const [selectedImage, setSelectedImage] = useState<string>(imgSrc)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(cropData?.rotation || 0)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isOriginImageFile, setIsOriginImageFile] = useState(true)
  const [containerHeight, setContainerHeight] = useState(() => {
    return cropData
      ? window.innerWidth * (cropData.originHeight / cropData.originWidth)
      : window.innerWidth * (1280 / 1920)
  })
  const imageInputRef = useRef<HTMLInputElement>(null)

  const initialCroppedAreaPixels = useRef(
    cropData
      ? {
          width: cropData.coordinate[1].x - cropData.coordinate[0].x,
          height: cropData.coordinate[1].x - cropData.coordinate[0].x,
          x: cropData.coordinate[0].x,
          y: cropData.coordinate[0].y
        }
      : undefined
  )

  const getIsValid = () => {
    if (!isOriginImageFile) return true
    if (cropData && initialCroppedAreaPixels.current) {
      if (!croppedAreaPixels) return false
      if (rotation !== cropData.rotation) return true
      return (
        initialCroppedAreaPixels.current.x !== croppedAreaPixels.x ||
        initialCroppedAreaPixels.current.y !== croppedAreaPixels.y ||
        initialCroppedAreaPixels.current.width !== croppedAreaPixels.width ||
        initialCroppedAreaPixels.current.height !== croppedAreaPixels.height
      )
    } else {
      if (zoom !== 1) return true
      if (rotation !== 0) return true
      return crop.x !== 0 || crop.y !== 0
    }
  }

  const valid = getIsValid()

  const handleImageFileChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async e => {
    if (!e.target.files) return
    const imgSrc = URL.createObjectURL(e.target.files[0])

    const img = new Image()
    img.src = imgSrc
    img.onload = () => {
      const height = window.innerWidth * (img.naturalHeight / img.naturalWidth)
      setContainerHeight(height)
      setIsOriginImageFile(false)
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
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      )
      if (!croppedImage) return

      const originImage = await urlToDataURL(selectedImage).then(
        webpImageSrc => {
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
        }
      )

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
      snackbar.error(snackbarMessages.updateUserInfo.error)
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
                  onChange={handleImageFileChange}
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
          initialCroppedAreaPixels={initialCroppedAreaPixels.current}
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
      )}
      <ConfirmButton disabled={!valid} onClick={handleConfirm} />
    </Stack>
  )
}

export default AvatarEditor
