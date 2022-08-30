import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import EditIcon from 'lib/assets/edit.svg'
import { EditablePhoto } from 'lib/domain/photo'
import { toBase64Photos } from 'lib/helper/image'
import ImageEditor from '../imageEditor/imageEditor'

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
        position="relative"
        width={1}
        bgcolor="#ddd"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'relative',
          cursor: 'pointer',
          aspectRatio: '4/3'
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
            <Button
              onClick={handleEditButtonClick}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                fontSize: '50px'
              }}
            >
              <EditIcon />
            </Button>
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
          <Typography sx={{ fontSize: 40 }}>+</Typography>
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
