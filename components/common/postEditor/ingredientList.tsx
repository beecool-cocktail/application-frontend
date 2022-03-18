import React from 'react'
import { Control } from 'react-hook-form'
import { Stack, Typography } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
import { CocktailPostForm } from 'lib/types/cocktail'
import AddButton from 'components/common/button/addButton'
import IngredientInput from './ingredientInput'

interface IngredientListProps {
  control: Control<CocktailPostForm>
}

const IngredientList = ({ control }: IngredientListProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'ingredient_list',
    control
  })
  const handleAdd = () => append({ amount: 0, name: '', unit: '' })

  return (
    <Stack>
      <Typography>備料清單</Typography>
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <IngredientInput
            key={field.id}
            control={control}
            ingredientName={`ingredient_list.${index}.name`}
            amountName={`ingredient_list.${index}.amount`}
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
