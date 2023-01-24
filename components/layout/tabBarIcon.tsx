import React, { useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { Box } from '@mui/material'

interface TabBarIconProps {
  pressed: boolean
  artboard: string
}

const size = 24
const stateMachineName = 'State Machine 1'

const TabBarIcon = ({ pressed, artboard }: TabBarIconProps) => {
  const { rive, RiveComponent } = useRive({
    src: '/tabBar.riv',
    artboard,
    stateMachines: stateMachineName,
    autoplay: true
  })

  const input = useStateMachineInput(rive, stateMachineName, 'Pressed')

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

export default TabBarIcon
