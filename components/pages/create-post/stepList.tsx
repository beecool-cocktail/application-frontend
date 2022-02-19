import React, { useRef } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useSprings, animated, config } from 'react-spring'
import { useDrag } from '@use-gesture/react'
import { clamp } from 'ramda'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swap from 'lodash-move'
import { Control, useFieldArray } from 'react-hook-form'
import AddButton from 'components/common/button/addButton'
import { CocktailPostForm } from 'lib/types/cocktail'
import StepInput from './stepInput'

const fn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
  (index: number) =>
    active && index === originalIndex
      ? {
          y: curIndex * 100 + y,
          scale: 1.005,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === 'zIndex',
          config: (key: string) => (key === 'y' ? config.stiff : config.default)
        }
      : {
          y: order.indexOf(index) * 100,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false
        }

interface StepListProps {
  control: Control<CocktailPostForm>
}

const StepList = ({ control }: StepListProps) => {
  const { fields, append, remove } = useFieldArray({ name: 'steps', control })
  const order = useRef(fields.map((_, index) => index))
  const [springs, api] = useSprings(fields.length, fn(order.current))
  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(
      0,
      Math.max(0, Math.round((curIndex * 100 + y) / 100)),
      fields.length - 1
    )
    const newOrder = swap(order.current, curIndex, curRow)
    api.start(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!active) order.current = newOrder
  })

  const handleAdd = () => {
    append({ description: '' })
    const newOrder = [...order.current, fields.length]
    order.current = newOrder
  }

  const handleRemove = (index: number) => () => {
    const newOrder = order.current.slice()
    newOrder.splice(index, 1)
    for (let i = index; i < newOrder.length; i++) newOrder[i]--
    order.current = newOrder
    remove(index)
  }

  return (
    <Stack>
      <Typography>步驟教學</Typography>
      <Box width={1} height={fields.length * 100} position="relative">
        {springs.map(({ zIndex, shadow, y, scale }, index) => (
          <animated.div
            key={index}
            style={{
              position: 'absolute',
              width: '100%',
              zIndex,
              boxShadow: shadow.to(
                s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
              y,
              scale,
              height: 100
            }}
          >
            <StepInput
              name={`steps.${index}.description`}
              control={control}
              onRemove={handleRemove(index)}
              bind={bind(index)}
              height={100}
            />
          </animated.div>
        ))}
      </Box>
      <AddButton onClick={handleAdd} />
    </Stack>
  )
}

export default StepList
