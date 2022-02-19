import React from 'react'
import { Stack, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import IngredientList from './ingredientList'
import StepList from './stepList'
import type { CocktailPostForm } from 'lib/types/cocktail'

interface PostTutorialProps {
  control: Control<CocktailPostForm>
}

const PostTutorial = ({ control }: PostTutorialProps) => {
  return (
    <Stack spacing={4} width={1}>
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField label="調酒名稱" fullWidth {...field} />
        )}
      />
      <Stack>
        <IngredientList control={control} />
        <StepList control={control} />
      </Stack>
    </Stack>
  )
}

export default PostTutorial
