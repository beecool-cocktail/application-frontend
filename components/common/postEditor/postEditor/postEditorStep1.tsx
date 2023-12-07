import React from 'react'
import { Stack } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import Input from 'components/common/input/input'
import { CocktailPostForm } from 'lib/domain/cocktail'
import { CropResult } from 'lib/domain/photo'
import IngredientList from '../ingredientList'
import StepList from '../stepList'
import DescriptionInput from '../descriptionInput'
import ImagesEditBlock from '../imagesEditBlock'

interface PostTutorialProps {
  control: Control<CocktailPostForm>
  onImageToCover(index: number): void
  onImageUpload(index: number, urls: string[]): void
  onImageEdit(index: number, cropResult: CropResult): void
  onImageDelete(index: number): void
}

const PostEditorStep1 = (props: PostTutorialProps) => {
  const { control } = props
  return (
    <Stack spacing={3} width={1}>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            label="調酒名稱*"
            placeholder="最多輸入30個字"
            fullWidth
            maxLength={30}
            {...field}
          />
        )}
      />
      <IngredientList control={control} />
      <StepList control={control} />
      <ImagesEditBlock {...props} />
      <DescriptionInput control={control} />
    </Stack>
  )
}

export default PostEditorStep1
