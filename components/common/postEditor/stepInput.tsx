import React from 'react'
import { Stack } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import DeleteIcon from 'lib/assets/deleteInputOutlined.svg'
import Input from 'components/common/input/input'
import { CocktailPostForm } from 'lib/domain/cocktail'
import IconButton from '../button/iconButton'

interface StepInputProps {
  name: `steps.${number}.description`
  control: Control<CocktailPostForm>
  bind: React.DOMAttributes<HTMLElement>
  removeDisabled?: boolean
  required: boolean
  onRemove(): void
}

const StepInput = ({
  name,
  control,
  bind,
  removeDisabled = false,
  required,
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
        rules={{ required }}
        render={({ field, fieldState }) => (
          <Input
            placeholder="請輸入教學步驟"
            maxLength={50}
            multiline
            fullWidth
            showLetterCount={false}
            error={fieldState.error?.type === 'pattern'}
            {...field}
          />
        )}
      />
    </Stack>
  )
}

export default StepInput
