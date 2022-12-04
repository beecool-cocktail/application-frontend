import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

interface RiveLogoProps {
  src: string
  scrolling: boolean
  artboard: string
  stateMachines: string
}

const RiveLogo = ({
  src,
  scrolling,
  artboard,
  stateMachines
}: RiveLogoProps) => {
  const { rive, RiveComponent } = useRive({
    src,
    artboard,
    stateMachines,
    autoplay: true
  })

  const input = useStateMachineInput(rive, stateMachines, 'Scrolling')

  useEffect(() => {
    if (!input) return
    input.value = scrolling
  }, [input, scrolling])

  return (
    <Box>
      <RiveComponent
        style={{
          width: 500,
          height: 500
        }}
        width={500}
        height={500}
      />
    </Box>
  )
}

export default RiveLogo
