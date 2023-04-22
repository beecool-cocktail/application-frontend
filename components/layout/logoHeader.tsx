import { useState, useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import throttle from 'lodash.throttle'
import LogoSVG from 'lib/assets/logo.svg'
import CornerSVG from 'lib/assets/corner.svg'
import BottomLineSVG from 'lib/assets/bottomLine.svg'

const Logo = () => {
  const [useSmallLog, setUseSmallLogo] = useState(false)

  useEffect(() => {
    const scrollHandler = throttle(() => {
      if (window.scrollY > 0) setUseSmallLogo(true)
      else setUseSmallLogo(false)
    }, 100)

    window.addEventListener('scroll', scrollHandler)
    return () => {
      scrollHandler.cancel()
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <>
      <Box
        position="relative"
        width="100%"
        sx={{
          transitionDuration: '0.1s',
          opacity: useSmallLog ? 0 : 1
        }}
      >
        <LogoSVG width="100%" height={77} />
      </Box>
      <Box
        position="fixed"
        width="100%"
        sx={{
          top: -52,
          height: 52,
          bgcolor: theme => theme.palette.background.default,
          transitionDuration: '0.1s',
          transform: useSmallLog ? 'translateY(52px)' : '',
          zIndex: 1300
        }}
      >
        <Stack direction="row" columnGap="8px">
          <Box pt="10px" lineHeight={1}>
            <BottomLineSVG width={25} height={25} />
          </Box>
          <Box pt="16px" lineHeight={1}>
            <CornerSVG width={111} height={16} />
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export default Logo
