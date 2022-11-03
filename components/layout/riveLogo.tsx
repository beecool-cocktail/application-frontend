import React from 'react'
import { Box } from '@mui/material'
import { useRive } from '@rive-app/react-canvas'

interface RiveLogoProps {
  src: string
  autoplay?: boolean
}

const RiveLogo = ({ src, autoplay = false }: RiveLogoProps) => {
  const { rive, RiveComponent } = useRive({
    src,
    autoplay
  })

  return (
    <Box>
      <RiveComponent
        style={{
          width: 500,
          height: 500
        }}
        width={500}
        height={500}
        onClick={() => rive && rive.play()}
      />
    </Box>
  )
}

export default RiveLogo
