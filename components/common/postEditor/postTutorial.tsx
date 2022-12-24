import React from 'react'
import { Stack } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { CocktailPostForm } from 'lib/application/ports'
import Input from 'components/common/input/input'
import IngredientList from './ingredientList'
import StepList from './stepList'

interface PostTutorialProps {
  control: Control<CocktailPostForm>
}

const PostTutorial = ({ control }: PostTutorialProps) => {
  return (
    <Stack spacing={3} width={1}>
      <Controller
        control={control}
        name="title"
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

export default PostTutorial
