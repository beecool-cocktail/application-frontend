import React, { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Control, useFieldArray, useWatch } from 'react-hook-form'
import { CocktailPostForm } from 'lib/application/types/cocktail'
import IconButton from '../button/iconButton'
import AddIcon from '/lib/assets/plusAddOutlined.svg'
import StepInput from './stepInput'

interface StepListProps {
  control: Control<CocktailPostForm>
}

const StepList = ({ control }: StepListProps) => {
  const { fields, append, move, remove } = useFieldArray({
    name: 'steps',
    control
  })
  const steps = useWatch({ control, name: 'steps' })
  const required = steps.every(step => step.description.length === 0)

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

  const handleAdd = () => append({ description: '' })
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">步驟教學*</Typography>
        <Typography variant="body4" color={theme => theme.palette.light4.main}>
          長按拖曳可調整順序
        </Typography>
      </Stack>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          <Stack width={1} spacing="6px" position="relative" mt="4px">
            {fields.map((field, index) => (
              <StepInput
                key={field.id}
                id={field.id}
                name={`steps.${index}.description`}
                control={control}
                removeDisabled={fields.length <= 1}
                required={required}
                onRemove={() => remove(index)}
              />
            ))}
          </Stack>
          <DragOverlay>
            {activeIndex != -1 && activeId ? (
              <Box sx={{ transform: 'scale(1.015)' }}>
                <StepInput
                  key={activeId}
                  id={activeId}
                  name={`steps.${activeIndex}.description`}
                  control={control}
                  removeDisabled={fields.length <= 1}
                  required={required}
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

export default StepList
