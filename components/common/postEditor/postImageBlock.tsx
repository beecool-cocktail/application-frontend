import React from 'react'
import { Stack, TextField, Typography } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { CocktailPostForm } from 'lib/application/ports'
import ImageSelector, { ImageSelectorProps } from './imageSelector'

interface PostImageBlockProps {
  control: Control<CocktailPostForm>
  onImageToCover(index: number): void
  onImageUpload(urls: string[]): void
  onImageEdit(index: number, url: string): void
  onImageDelete(index: number): void
}

const PostImageBlock = ({
  control,
  onImageToCover,
  onImageUpload,
  onImageEdit,
  onImageDelete
}: PostImageBlockProps) => {
  return (
    <Stack width={1} alignItems="stretch" spacing={2}>
      <Controller
        control={control}
        name="photos"
        render={({ field }) => {
          const toImageSelectorProps = (index: number): ImageSelectorProps => {
            return {
              photo: field.value[index],
              onDelete: () => onImageDelete(index),
              onToCover: () => onImageToCover(index),
              onUpload: onImageUpload,
              onEdit: (url: string) => onImageEdit(index, url)
            }
          }

          return (
            <Stack spacing={1} component="label">
              <ImageSelector isCover {...toImageSelectorProps(0)} />
              <Stack width={1} spacing={1}>
                <Stack width={1} direction="row" spacing={1}>
                  <ImageSelector {...toImageSelectorProps(1)} />
                  <ImageSelector {...toImageSelectorProps(2)} />
                </Stack>
                <Stack width={1} direction="row" spacing={1}>
                  <ImageSelector {...toImageSelectorProps(3)} />
                  <ImageSelector {...toImageSelectorProps(4)} />
                </Stack>
              </Stack>
            </Stack>
          )
        }}
      />
      <Stack>
        <Typography>介紹調酒</Typography>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextField placeholder="請輸入文字" multiline rows={5} {...field} />
          )}
        ></Controller>
      </Stack>
    </Stack>
  )
}

export default PostImageBlock
