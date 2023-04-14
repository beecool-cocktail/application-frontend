import React from 'react'
import { Control, useWatch } from 'react-hook-form'
import { Box, Stack, Typography } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
import { CocktailPostForm } from 'lib/domain/cocktail'
import IconButton from '../button/iconButton'
import AddIcon from '/lib/assets/plusAddOutlined.svg'
import IngredientInput from './ingredientInput'

interface IngredientListProps {
  control: Control<CocktailPostForm>
}

const IngredientList = ({ control }: IngredientListProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'ingredients',
    control
  })
  const ingredients = useWatch({ control, name: 'ingredients' })
  const required =
    ingredients.every(ingredient => ingredient.name.length === 0) ||
    ingredients.some(ingredient => {
      return ingredient.name.length === 0 && ingredient.amount.length !== 0
    })
  const handleAdd = () => append({ name: '', amount: '' })

  return (
    <Stack>
      <Typography variant="body1">備料清單*</Typography>
      <Stack mt="4px" spacing="6px">
        {fields.map((field, index) => (
          <IngredientInput
            key={field.id}
            control={control}
            ingredientName={`ingredients.${index}.name`}
            amountName={`ingredients.${index}.amount`}
            removeDisabled={fields.length <= 1}
            required={required || field.amount.length !== 0}
            onRemove={() => remove(index)}
          />
        ))}
      </Stack>
      <Box display="flex" justifyContent="center" mt="12px">
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Box>
    </Stack>
  )
}

export default IngredientList
