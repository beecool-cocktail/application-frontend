import React from 'react'
import { Control } from 'react-hook-form'
import { Stack, Typography } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
import AddButton from 'components/common/button/addButton'
import { CocktailPostForm } from 'lib/application/ports'
import IngredientInput from './ingredientInput'

interface IngredientListProps {
  control: Control<CocktailPostForm>
}

const IngredientList = ({ control }: IngredientListProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'ingredients',
    control
  })
  const handleAdd = () => append({ name: '', amount: '' })

  return (
    <Stack>
      <Typography>備料清單*</Typography>
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <IngredientInput
            key={field.id}
            control={control}
            ingredientName={`ingredients.${index}.name`}
            amountName={`ingredients.${index}.amount`}
            removeDisabled={fields.length <= 1}
            onRemove={() => remove(index)}
          />
        ))}
      </Stack>
      <AddButton onClick={handleAdd} />
    </Stack>
  )
}

export default IngredientList
