import React from 'react'
import { Stack } from '@mui/material'
import { Control } from 'react-hook-form'
import { CocktailPostForm } from 'lib/application/types/cocktail'
import { CropResult } from 'lib/domain/photo'
import DescriptionInput from '../descriptionInput'
import ImagesEditBlock from '../imagesEditBlock'

interface PostCreateStep2Props {
  control: Control<CocktailPostForm>
  onImageToCover(index: number): void
  onImageUpload(index: number, urls: string[]): void
  onImageEdit(index: number, cropResult: CropResult): void
  onImageDelete(index: number): void
}

const PostCreateStep2 = (props: PostCreateStep2Props) => {
  const { control } = props
  return (
    <Stack width={1} alignItems="stretch" spacing={2}>
      <ImagesEditBlock {...props} />
      <DescriptionInput control={control} />
    </Stack>
  )
}

export default PostCreateStep2
