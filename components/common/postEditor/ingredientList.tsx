import React, { useState } from 'react'
import { Control, useWatch } from 'react-hook-form'
import { Box, Stack, Typography } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CocktailPostForm } from 'lib/application/types/cocktail'
import IconButton from '../button/iconButton'
import AddIcon from '/lib/assets/plusAddOutlined.svg'
import IngredientInput from './ingredientInput'

interface IngredientListProps {
  control: Control<CocktailPostForm>
}

const IngredientList = ({ control }: IngredientListProps) => {
  const { fields, append, move, remove } = useFieldArray({
    name: 'ingredients',
    control
  })
  const ingredients = useWatch({ control, name: 'ingredients' })
  const required =
    ingredients.every(ingredient => ingredient.name.length === 0) ||
    ingredients.some(ingredient => {
      return ingredient.name.length === 0 && ingredient.amount.length !== 0
    })

  const [activeId, setActiveId] = useState<string | null>(null)
  const activeIndex = fields.findIndex(f => f.id === activeId)
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 }
    }),
    useSensor(MouseSensor, {
      activationConstraint: { delay: 150, tolerance: 5 }
    })
  )
  const handleAdd = () => append({ name: '', amount: '' })
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
  }
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id)
      const newIndex = fields.findIndex(f => f.id === over.id)
      move(oldIndex, newIndex)
      setActiveId(null)
    }
  }

  return (
    <Stack>
      <Typography variant="body1">備料清單*</Typography>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          <Stack mt="4px" spacing="6px">
            {fields.map((field, index) => (
              <IngredientInput
                key={field.id}
                id={field.id}
                control={control}
                ingredientName={`ingredients.${index}.name`}
                amountName={`ingredients.${index}.amount`}
                removeDisabled={fields.length <= 1}
                required={required || field.amount.length !== 0}
                onRemove={() => remove(index)}
              />
            ))}
          </Stack>
          <DragOverlay>
            {activeIndex != -1 && activeId ? (
              <Box sx={{ transform: 'scale(1.015)' }}>
                <IngredientInput
                  key={activeId}
                  id={activeId}
                  control={control}
                  ingredientName={`ingredients.${activeIndex}.name`}
                  amountName={`ingredients.${activeIndex}.amount`}
                  removeDisabled={fields.length <= 1}
                  required={required || fields[activeIndex].amount.length !== 0}
                  onRemove={() => remove(activeIndex)}
                />
              </Box>
            ) : null}
          </DragOverlay>
        </SortableContext>
      </DndContext>
      <Box display="flex" justifyContent="center" mt="12px">
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Box>
    </Stack>
  )
}

export default IngredientList
