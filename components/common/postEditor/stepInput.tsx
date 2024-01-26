import React from 'react'
import { Stack } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DeleteIcon from 'lib/assets/deleteInputOutlined.svg'
import Input from 'components/common/input/input'
import { CocktailPostForm } from 'lib/domain/cocktail'
import IconButton from '../button/iconButton'

interface StepInputProps {
  id: string
  name: `steps.${number}.description`
  control: Control<CocktailPostForm>
  removeDisabled?: boolean
  required: boolean
  onRemove(): void
}

const StepInput = ({
  id,
  name,
  control,
  removeDisabled = false,
  required,
  onRemove
}: StepInputProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Stack
      ref={setNodeRef}
      style={style}
      spacing={1}
      direction="row"
      alignItems="center"
      {...attributes}
      {...listeners}
      sx={{ opacity: isDragging ? 0.4 : 1 }}
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
