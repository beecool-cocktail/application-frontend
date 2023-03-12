import React from 'react'
import { Stack } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import Input from 'components/common/input/input'
import { CocktailPostStep1Form } from 'lib/domain/cocktail'
import IngredientList from './ingredientList'
import StepList from './stepList'

interface PostTutorialProps {
  control: Control<CocktailPostStep1Form>
}

const PostEditorStep1 = ({ control }: PostTutorialProps) => {
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
    </Stack>
  )
}

export default PostEditorStep1
