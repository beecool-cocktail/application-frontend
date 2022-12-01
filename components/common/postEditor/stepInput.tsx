import React from 'react'
import { Stack, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { Controller, Control } from 'react-hook-form'
import RemoveButton from 'components/common/button/removeButton'
import Input from 'components/common/input/input'
import { CocktailPostForm } from 'lib/application/ports'

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
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            placeholder="請輸入教學步驟"
            // multiline
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
