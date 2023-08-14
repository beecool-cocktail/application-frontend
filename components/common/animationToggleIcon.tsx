import React, { useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { Box } from '@mui/material'

export type ToggleIconArtboard =
  | 'Like'
  | 'Switch Control'
  | 'Checkbox'
  | 'Home'
  | 'Search'
  | 'Add'
  | 'Profile'

interface AnimationToggleIconProps {
  active: boolean
  artboard: ToggleIconArtboard
}

const size = 24
const stateMachineName = 'State Machine 1'
const inputName = 'Actived'

const AnimationToggleIcon = ({
  artboard,
  active
}: AnimationToggleIconProps) => {
  const { rive, RiveComponent } = useRive({
    src: '/toggleIcon.riv',
    artboard,
    stateMachines: stateMachineName,
    autoplay: true
  })

  const input = useStateMachineInput(rive, stateMachineName, inputName, active)

  useEffect(() => {
    if (!input) return
    input.value = active
  }, [input, active])

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
