import { useState, useEffect, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import { Box, Stack } from '@mui/material'
import throttle from 'lodash.throttle'
import LogoSVG from 'lib/assets/logo.svg'
import CornerSVG from 'lib/assets/corner.svg'
import BottomLineSVG from 'lib/assets/bottomLine.svg'

const Logo = () => {
  const [useSmallLog, setUseSmallLogo] = useState(false)
  const prevUseSmallLogRef = useRef(useSmallLog)
  const [springs, api] = useSpring(() => {
    return {
      y: 0,
      config: {
        tension: 300,
        friction: 20,
        mass: 1
      }
    }
  })

  useEffect(() => {
    setUseSmallLogo(window.scrollY > 0)

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

  useEffect(() => {
    if (useSmallLog !== prevUseSmallLogRef.current) {
      api.start({
        from: { y: 0 },
        to: { y: 52 },
        reverse: !useSmallLog
      })
    }
    prevUseSmallLogRef.current = useSmallLog
  }, [api, useSmallLog])

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
      <animated.div
        style={{
          position: 'fixed',
          width: '100%',
          top: -52,
          height: 52,
          zIndex: 1300,
          ...springs
        }}
      >
        <Box
          position="absolute"
          sx={{
            width: 1,
            height: 20,
            top: -20,
            bgcolor: theme => theme.palette.background.default
          }}
        ></Box>
        <Box
          sx={{
            width: 1,
            height: 1,
            bgcolor: theme => theme.palette.background.default
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
      </animated.div>
    </>
  )
}

export default Logo
