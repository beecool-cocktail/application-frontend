import React, { useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { Box } from '@mui/material'

export type ToggleIconArtboard =
  | 'Like'
  | 'Switch Control'
  | 'Checkbox'
  | 'Home Pressed'
  | 'Search Pressed'
  | 'Add Pressed'
  | 'Profile Pressed'

interface AnimationToggleIconProps {
  pressed: boolean
  artboard: ToggleIconArtboard
}

const size = 24
const stateMachineName = 'State Machine 1'
const inputName = 'Pressed'

const AnimationToggleIcon = ({
  artboard,
  pressed
}: AnimationToggleIconProps) => {
  const { rive, RiveComponent } = useRive({
    src: '/tabBar.riv',
    artboard,
    stateMachines: stateMachineName,
    autoplay: true
  })

  const input = useStateMachineInput(rive, stateMachineName, inputName, pressed)

  useEffect(() => {
    if (!input) return
    input.value = pressed
  }, [input, pressed])

  return (
    <Box>
      <RiveComponent
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    </Box>
  )
}

export default AnimationToggleIcon
