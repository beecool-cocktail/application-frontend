import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import lottie from 'lottie-web'

interface AnimationLogoProps {
  path: string
  animationData?: object
  loop?: boolean
  autoplay?: boolean
}

const LottieLogo = ({
  path,
  animationData,
  loop = false,
  autoplay = true
}: AnimationLogoProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      path,
      animationData
    })

    return () => animation.destroy()
  }, [animationData, autoplay, loop, path])

  return <Box width={500} height={500} ref={containerRef} />
}

export default LottieLogo
