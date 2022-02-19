import React from 'react'
import { Stack, OutlinedInput, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { Controller, Control } from 'react-hook-form'
import { CocktailPostForm } from 'lib/types/cocktail'
import RemoveButton from 'components/common/button/removeButton'

interface StepInputProps {
  name: `steps.${number}.description`
  control: Control<CocktailPostForm>
  bind: React.DOMAttributes<HTMLElement>
  height: number
  onRemove(): void
}

const StepInput = ({
  name,
  control,
  bind,
  height,
  onRemove
}: StepInputProps) => {
  return (
    <Stack spacing={1} direction="row" alignItems="center" height={height}>
      <RemoveButton onClick={onRemove} />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <OutlinedInput placeholder="輸入步驟" {...field} fullWidth />
        )}
      />
      <IconButton {...bind}>
        <Menu />
        <IconButton />
      </IconButton>
    </Stack>
  )
}

export default StepInput
