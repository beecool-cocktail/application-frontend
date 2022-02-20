import React from 'react'
import { Stack, TextField, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { Controller, Control } from 'react-hook-form'
import { CocktailPostForm } from 'lib/types/cocktail'
import RemoveButton from 'components/common/button/removeButton'

interface StepInputProps {
  name: `steps.${number}.description`
  control: Control<CocktailPostForm>
  bind: React.DOMAttributes<HTMLElement>
  height: number
  removeDisabled?: boolean
  onRemove(): void
}

const StepInput = ({
  name,
  control,
  bind,
  height,
  removeDisabled = false,
  onRemove
}: StepInputProps) => {
  return (
    <Stack spacing={1} direction="row" alignItems="center" height={height}>
      <RemoveButton disabled={removeDisabled} onClick={onRemove} />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            placeholder="輸入步驟"
            multiline
            fullWidth
            maxRows={2}
            {...field}
          />
        )}
      />
      <IconButton {...bind} style={{ touchAction: 'none' }}>
        <Menu />
      </IconButton>
    </Stack>
  )
}

export default StepInput
