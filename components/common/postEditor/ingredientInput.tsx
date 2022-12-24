import React from 'react'
import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { Controller, Control } from 'react-hook-form'
import Input from 'components/common/input/input'
import DeleteIcon from 'lib/assets/deleteInputOutlined.svg'
import { CocktailPostForm } from 'lib/application/ports'
import IconButton from '../button/iconButton'

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
      spacing="6px"
    >
      <IconButton disabled={removeDisabled} onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
      <Box flex={1} width={0}>
        <Controller
          control={control}
          name={ingredientName}
          rules={{ required: true }}
          render={({ field }) => (
            <Input placeholder="請輸入材料" fullWidth {...field} />
          )}
        />
      </Box>
      <Box width={100}>
        <Controller
          control={control}
          name={amountName}
          rules={{ required: true }}
          render={({ field }) => (
            <Input placeholder="數量/單位" fullWidth {...field} />
          )}
        />
      </Box>
    </Stack>
  )
}

export default IngredientInput
