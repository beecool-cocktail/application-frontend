import React from 'react'
import { OutlinedInput, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { Controller, Control } from 'react-hook-form'
import RemoveButton from 'components/common/button/removeButton'
import { CocktailPostForm } from 'lib/types/cocktail'

interface IngredientInputProps {
  ingredientName: `ingredients.${number}.name`
  amountName: `ingredients.${number}.amount`
  control: Control<CocktailPostForm>
  removeDisabled?: boolean
  onRemove(): void
}

const IngredientInput = ({
  ingredientName,
  amountName,
  control,
  removeDisabled = false,
  onRemove
}: IngredientInputProps) => {
  return (
    <Stack
      direction="row"
      display="flex"
      alignItems="center"
      flexDirection="row"
      spacing={1}
    >
      <RemoveButton disabled={removeDisabled} onClick={onRemove} />
      <Box flex={1}>
        <Controller
          control={control}
          name={ingredientName}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput placeholder="輸入材料" fullWidth {...field} />
          )}
        />
      </Box>
      <Box width={100}>
        <Controller
          control={control}
          name={amountName}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput placeholder="數量/單位" fullWidth {...field} />
          )}
        />
      </Box>
    </Stack>
  )
}

export default IngredientInput
