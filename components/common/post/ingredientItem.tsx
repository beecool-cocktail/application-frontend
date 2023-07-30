import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Ingredient } from 'lib/domain/cocktail'
import Checkbox from '../input/checkbox'

export interface IngredientItemProps {
  ingredient: Ingredient
}

const IngredientItem = ({ ingredient }: IngredientItemProps) => {
  const [checked, setChecked] = useState(false)

  return (
    <Stack
      direction="row"
      sx={{ cursor: 'pointer' }}
      onClick={() => setChecked(checked => !checked)}
    >
      <Checkbox checked={checked} />
      <Stack flex={1} direction="row" justifyContent="space-between" ml="12px">
        <Typography
          variant="body2"
          sx={{ color: theme => theme.palette.light2.main }}
        >
          {ingredient.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme => theme.palette.light2.main }}
        >
          {ingredient.amount}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default IngredientItem
