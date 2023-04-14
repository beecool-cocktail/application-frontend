import { useState, useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import throttle from 'lodash.throttle'
import { MAX_WIDTH } from 'lib/constants/layout'

export interface TopNavigationProps {
  position?: 'static' | 'fixed' | 'sticky'
  thresholdHeight?: number
  bgcolor?: string
  title?: ((concrete: boolean) => string) | string
  leftSlot?: (concrete: boolean) => React.ReactNode
  rightSlot?: (concrete: boolean) => React.ReactNode
}

export const NAV_HEIGHT = 40

const TopNavigation = ({
  position = 'static',
  thresholdHeight = 0,
  bgcolor = 'transparent',
  title,
  leftSlot,
  rightSlot
}: TopNavigationProps) => {
  const [concrete, setConcrete] = useState(false)

  useEffect(() => {
    const processConcrete = () => {
      if (window.scrollY >= thresholdHeight) setConcrete(true)
      else setConcrete(false)
    }

    processConcrete()

    const handleScroll = throttle(processConcrete, 100)
    window.addEventListener('scroll', handleScroll)
    return () => {
      handleScroll.cancel()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [thresholdHeight])

  const renderTitle = () => {
    if (!title) return null
    if (typeof title === 'string') return title
    return title(concrete)
  }

  return (
    <Stack
      direction="row"
      sx={{
        position,
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 'fab',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        maxWidth: MAX_WIDTH,
        height: NAV_HEIGHT,
        px: '16px',
        bgcolor: theme => (concrete ? theme.palette.dark3.main : bgcolor)
      }}
    >
      <Stack
        direction="row"
        flex={1}
        columnGap="8px"
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
          {renderTitle()}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        columnGap="8px"
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
