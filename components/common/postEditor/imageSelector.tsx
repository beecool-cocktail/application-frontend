import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material'
import MoreIcon from 'lib/assets/more.svg'
import CameraPlusIcon from 'lib/assets/cameraPlus.svg'
import { EditablePhoto } from 'lib/domain/photo'
import { toBase64Photos } from 'lib/helper/image'
import ImageEditor from '../imageEditor/imageEditor'
import IconButton from '../button/iconButton'

export interface ImageSelectorProps {
  index: number
  isCover?: boolean
  photo?: EditablePhoto
  onToCover(): void
  onUpload(urls: string[]): void
  onEdit(url: string): void
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
  const [imageEditorOpen, setImageEditorOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const fileInputId = `upload-${index}`

  const handleEditButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenu = () => setAnchorEl(null)

  const handleToCoverImage = () => {
    closeMenu()
    onToCover()
  }

  const handleUpload = () => {
    closeMenu()
    inputRef.current?.click()
  }

  const handleEdit = () => {
    closeMenu()
    setImageEditorOpen(true)
  }

  const handleDelete = () => {
    closeMenu()
    onDelete()
  }

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
          borderRadius: '4px',
          overflow: 'hidden'
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
                bottom: '4px',
                right: '8px',
                lineHeight: 0
              }}
            >
              <IconButton size={18} onClick={handleEditButtonClick}>
                <MoreIcon />
              </IconButton>
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
            <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
              {!isCover && (
                <MenuItem onClick={handleToCoverImage}>更換成封面照</MenuItem>
              )}
              <MenuItem onClick={handleUpload}>重新上傳</MenuItem>
              <MenuItem onClick={handleEdit}>編輯照片</MenuItem>
              <MenuItem onClick={handleDelete}>刪除</MenuItem>
            </Menu>
            {imageEditorOpen && (
              <ImageEditor
                imgSrc={photo.originURL}
                aspect={4 / 3}
                onConfirm={url => {
                  onEdit(url)
                  setImageEditorOpen(false)
                }}
                onCancel={() => setImageEditorOpen(false)}
              />
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
