import React from 'react'
import { Stack } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import DeleteIcon from 'lib/assets/deleteInputOutlined.svg'
import Input from 'components/common/input/input'
import { CocktailPostForm } from 'lib/application/ports'
import IconButton from '../button/iconButton'

interface StepInputProps {
  name: `steps.${number}.description`
  control: Control<CocktailPostForm>
  bind: React.DOMAttributes<HTMLElement>
  removeDisabled?: boolean
  onRemove(): void
}

const StepInput = ({
  name,
  control,
  bind,
  removeDisabled = false,
  onRemove
}: StepInputProps) => {
  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      {...bind}
      style={{ touchAction: 'none' }}
    >
      <IconButton disabled={removeDisabled} onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <Input placeholder="請輸入教學步驟" multiline fullWidth {...field} />
        )}
      />
    </Stack>
  )
}

export default StepInput
