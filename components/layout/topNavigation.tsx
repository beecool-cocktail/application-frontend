import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import throttle from 'lodash.throttle'

interface TopNavigationProps {
  position?: 'fixed' | 'sticky'
  thresholdHeight?: number
  children: (concrete: boolean) => React.ReactNode
}

export const NAV_HEIGHT = 40

const TopNavigation = ({
  children,
  thresholdHeight = 0,
  position = 'sticky'
}: TopNavigationProps) => {
  const [concrete, setConcrete] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY >= thresholdHeight) setConcrete(true)
      else setConcrete(false)
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [concrete, thresholdHeight])

  return (
    <Box
      sx={{
        position,
        zIndex: 'fab',
        top: 0,
        left: 0,
        width: '100%',
        height: NAV_HEIGHT
      }}
    >
      {children(concrete)}
    </Box>
  )
}

export default TopNavigation
