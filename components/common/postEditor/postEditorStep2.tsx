import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { getCharacterCount } from 'lib/helper/string'
import { CocktailPostStep2Form } from 'lib/domain/cocktail'
import Input from '../input/input'
import ImageSelector, { ImageSelectorProps } from './imageSelector'

interface PostImageBlockProps {
  control: Control<CocktailPostStep2Form>
  onImageToCover(index: number): void
  onImageUpload(index: number, urls: string[]): void
  onImageEdit(index: number, url: string): void
  onImageDelete(index: number): void
}

const PostEditorStep2 = ({
  control,
  onImageToCover,
  onImageUpload,
  onImageEdit,
  onImageDelete
}: PostImageBlockProps) => {
  return (
    <Stack width={1} alignItems="stretch" spacing={2}>
      <Stack width={1} spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body1"
            sx={{ color: theme => theme.palette.light1.main }}
          >
            調酒照片
          </Typography>
          <Typography
            variant="body4"
            sx={{ color: theme => theme.palette.light4.main }}
          >
            拖曳照片可變換順序
          </Typography>
        </Stack>
        <Controller
          control={control}
          name="photos"
          render={({ field }) => {
            const toImageSelectorProps = (
              index: number
            ): ImageSelectorProps => {
              return {
                index,
                photo: field.value[index],
                onDelete: () => onImageDelete(index),
                onToCover: () => onImageToCover(index),
                onUpload: (urls: string[]) => onImageUpload(index, urls),
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
      </Stack>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Input
            placeholder="寫下這則調酒的故事吧！"
            label="介紹調酒"
            multiline
            rows={5}
            maxLength={300}
            getLetterCount={getCharacterCount}
            {...field}
          />
        )}
      ></Controller>
    </Stack>
  )
}

export default PostEditorStep2
