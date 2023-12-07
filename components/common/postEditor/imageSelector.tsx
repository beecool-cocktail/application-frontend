import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Stack, Typography } from '@mui/material'
import CameraPlusIcon from 'lib/assets/cameraPlus.svg'
import { CropResult, EditablePhoto } from 'lib/domain/photo'
import { toBase64Photos } from 'lib/helper/image'
import EditIcon from 'lib/assets/editOutlined.svg'
import ReloadIcon from 'lib/assets/reloadBlueBgOutlined.svg'
import PictureIcon from 'lib/assets/picture.svg'
import TrashIcon from 'lib/assets/trashOutlined.svg'
import CocktailImageEditor from '../imageEditor/cocktailImageEditor'
import ActionSheet, { ActionButtonProps } from './actionSheet'

export interface ImageSelectorProps {
  index: number
  isCover?: boolean
  photo?: EditablePhoto
  onToCover(): void
  onUpload(urls: string[]): void
  onEdit(cropResult: CropResult): void
  onDelete(): void
}

const ImageSelector = ({
  index,
  isCover = false,
  photo,
  onToCover,
  onUpload,
  onEdit,
  onDelete
}: ImageSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageEditing, setImageEditing] = useState(false)
  const fileInputId = `upload-${index}`

  const handleReUpload = () => {
    inputRef.current?.click()
  }

  const handleToCoverImage = () => {
    onToCover()
  }

  const handleEdit = () => {
    setImageEditing(true)
  }

  const handleDelete = () => {
    onDelete()
  }

  const actions = [
    {
      text: '重新上傳',
      icon: <ReloadIcon />,
      onClick: handleReUpload
    },
    {
      text: '編輯照片',
      icon: <EditIcon />,
      onClick: handleEdit
    },
    !isCover && {
      text: '換成封面',
      icon: <PictureIcon />,
      onClick: handleToCoverImage
    },
    {
      text: '刪除照片',
      icon: <TrashIcon />,
      onClick: handleDelete
    }
  ].filter(Boolean) as ActionButtonProps[]

  return (
    <Box width={1}>
      <Box
        width={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'relative',
          cursor: 'pointer',
          aspectRatio: '4/3',
          bgcolor: theme => theme.palette.dark6.main,
          borderRadius: '4px'
          // overflow: 'hidden'
        }}
        htmlFor={fileInputId}
        component="label"
        onClick={(e: React.SyntheticEvent<HTMLLabelElement>) => {
          if (photo) e.preventDefault()
        }}
      >
        {photo ? (
          <>
            <Image src={photo.editedURL} alt="image" layout="fill" />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 45,
                background:
                  'radial-gradient(198.57% 198.57% at 50% 207.14%, rgba(0, 0, 0, 0.6) 60.51%, rgba(0, 0, 0, 0) 100%)'
              }}
            ></Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: '4px',
                right: '8px',
                lineHeight: 0
              }}
            >
              <ActionSheet topOffset={230} actions={actions} />
            </Box>
            {isCover && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '8px',
                  top: '8px',
                  width: 56,
                  height: 26,
                  bgcolor: theme => theme.palette.dark5.main,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '100px'
                }}
              >
                <Typography
                  variant="body3"
                  sx={{ color: theme => theme.palette.light2.main }}
                >
                  封面照
                </Typography>
              </Box>
            )}
            {imageEditing && (
              <Box zIndex={1200}>
                <CocktailImageEditor
                  imgSrc={photo.originURL}
                  cropData={
                    photo.cropResult && {
                      originWidth: photo.cropResult.width,
                      originHeight: photo.cropResult.height,
                      coordinate: photo.cropResult.coordinate,
                      rotation: photo.cropResult.rotation
                    }
                  }
                  onConfirm={result => {
                    onEdit(result)
                    setImageEditing(false)
                  }}
                  onCancel={() => setImageEditing(false)}
                />
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ width: '100%', height: '100%', padding: '8px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                fontSize: isCover ? 48 : 32,
                color: 'transparent',
                border: theme => `2px dashed ${theme.palette.light4.main}`,
                borderRadius: '4px'
              }}
            >
              <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <CameraPlusIcon />
                {isCover && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme => theme.palette.light2.main,
                      textAlign: 'center'
                    }}
                  >
                    點擊新增照片
                    <br />
                    最多可上傳 5 張
                  </Typography>
                )}
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
      <input
        id={fileInputId}
        ref={inputRef}
        onClick={e => {
          e.stopPropagation()
        }}
        onChange={async e => {
          const { files } = e.target
          if (!files || files.length === 0) return
          const dataUrls = await toBase64Photos(files)
          onUpload(dataUrls)
        }}
        accept="image/*"
        type="file"
        multiple={!photo}
        style={{ display: 'none' }}
      />
    </Box>
  )
}

export default ImageSelector
