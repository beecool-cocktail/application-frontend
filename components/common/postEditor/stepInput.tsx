import React from 'react'
import { Stack } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import DeleteIcon from 'lib/assets/deleteInputOutlined.svg'
import Input from 'components/common/input/input'
import { CocktailPostStep1Form } from 'lib/domain/cocktail'
import IconButton from '../button/iconButton'

interface StepInputProps {
  name: `steps.${number}.description`
  control: Control<CocktailPostStep1Form>
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
