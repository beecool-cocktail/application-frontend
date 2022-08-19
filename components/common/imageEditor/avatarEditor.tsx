/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import ReactCrop, { Crop, PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import useSnackbar from 'lib/application/ui/useSnackbar'
import BasedTopNavigation from 'components/layout/topNavigation'
import { centerAspectCrop } from 'lib/helper/image'
import ConfirmIcon from 'lib/assets/confirm.svg'
import { Coordinate } from 'lib/domain/photo'
import Button from '../button/button'
import IconButton from '../button/iconButton'
import BackButton from '../button/backButton'

interface ImageEditorProps {
  title: string
  imgSrc: string
  onConfirm(result: {
    objectURL: string
    width: number
    height: number
    coordinate: Coordinate[]
  }): void
}

const ImageEditor = ({ title, imgSrc, onConfirm }: ImageEditorProps) => {
  const snackbar = useSnackbar()
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const aspect = 1

  const handleConfirm = () => {
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

      const result = {
        objectURL: imgSrc,
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
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 1,
              height: 1,
              px: '16px',
              backgroundColor: theme => theme.palette.dark3.main
            }}
          >
            <BackButton />
            <Typography variant="body1" color="light1">
              {title}
            </Typography>
            <IconButton onClick={handleConfirm}>
              <ConfirmIcon />
            </IconButton>
          </Stack>
        )}
      </BasedTopNavigation>
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
            alt="Crop me"
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

export default ImageEditor
