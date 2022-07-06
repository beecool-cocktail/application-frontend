import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import throttle from 'lodash.throttle'
import BackButton from '../button/backButton'
import ShareButton from '../button/shareButton'

interface TopNavigationProps {
  title: string
}

const NAV_HEIGHT = 40

const TopNavigation = ({ title }: TopNavigationProps) => {
  const [concrete, setConcrete] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const ratio = 3 / 4
      const swiperHeight = window.innerWidth * ratio
      const thresholdHeight = swiperHeight - NAV_HEIGHT
      if (window.scrollY >= thresholdHeight) setConcrete(true)
      else setConcrete(false)
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [concrete])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
        width: '100%',
        height: NAV_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '16px',
        backgroundColor: concrete ? '#111' : undefined
      }}
    >
      <BackButton contained={!concrete} />
      <ShareButton title={title} contained={!concrete} />
    </Box>
  )
}

export default TopNavigation
