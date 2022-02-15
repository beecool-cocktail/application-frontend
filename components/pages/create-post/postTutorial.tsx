import React from 'react'
import { OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Control, Controller, useFieldArray } from 'react-hook-form'
import AddButton from 'components/common/button/addButton'
import RemoveButton from 'components/common/button/removeButton'
import type { CocktailPostForm } from 'lib/types/cocktail'

interface PostTutorialProps {
  control: Control<CocktailPostForm>
}

const PostTutorial = ({ control }: PostTutorialProps) => {
  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep
  } = useFieldArray({
    name: 'steps',
    control
  })
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient
  } = useFieldArray({
    name: 'ingredients',
    control
  })

  const handleAddStep = () => {
    appendStep({ description: '' })
  }

  const handleAddIngredient = () => {
    appendIngredient({ amount: '', unit: '', name: '' })
  }

  return (
    <Stack spacing={4} width={1}>
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField label="調酒名稱" fullWidth {...field} />
        )}
      />
      <Stack>
        <Typography>備料清單</Typography>
        <Stack spacing={2}>
          {ingredientFields.map((field, index) => (
            <Stack
              key={field.id}
              direction="row"
              display="flex"
              flexDirection="row"
              spacing={1}
            >
              <RemoveButton onClick={removeIngredient} />
              <Box flex={1}>
                <Controller
                  control={control}
                  name={`ingredients.${index}.name`}
                  render={({ field }) => (
                    <OutlinedInput
                      placeholder="輸入材料"
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box width={100}>
                <Controller
                  control={control}
                  name={`ingredients.${index}.unit`}
                  render={({ field }) => (
                    <OutlinedInput
                      placeholder="數量/單位"
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Box>
            </Stack>
          ))}
        </Stack>
        <AddButton onClick={handleAddIngredient} />
      </Stack>
      <Stack>
        <Typography>步驟教學</Typography>
        <Stack spacing={2} width={1}>
          {stepFields.map((field, index) => (
            <Stack direction="row" key={field.id}>
              <RemoveButton onClick={() => removeStep(index)} />
              <Controller
                control={control}
                name={`steps.${index}.description`}
                render={({ field }) => (
                  <OutlinedInput placeholder="輸入步驟" {...field} fullWidth />
                )}
              />
            </Stack>
          ))}
        </Stack>
        <AddButton onClick={handleAddStep} />
      </Stack>
    </Stack>
  )
}

export default PostTutorial
