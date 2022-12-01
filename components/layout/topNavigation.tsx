import { useState, useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import throttle from 'lodash.throttle'

interface TopNavigationProps {
  position?: 'fixed' | 'sticky'
  thresholdHeight?: number
  title?: (concrete: boolean) => string
  leftSlot?: (concrete: boolean) => React.ReactNode
  rightSlot?: (concrete: boolean) => React.ReactNode
}

export const NAV_HEIGHT = 40

const TopNavigation = ({
  thresholdHeight = NAV_HEIGHT,
  position = 'sticky',
  title,
  leftSlot,
  rightSlot
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
    <Stack
      direction="row"
      sx={{
        position,
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 'fab',
        top: 0,
        left: 0,
        width: '100%',
        height: NAV_HEIGHT,
        px: '16px',
        backgroundColor: theme =>
          concrete ? theme.palette.dark3.main : undefined
      }}
    >
      <Stack
        direction="row"
        flex={1}
        rowGap="8px"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
      >
        {leftSlot?.(concrete)}
      </Stack>
      <Stack
        direction="row"
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body1" color="light1">
          {title?.(concrete)}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        rowGap="8px"
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        {rightSlot?.(concrete)}
      </Stack>
    </Stack>
  )
}

export default TopNavigation
