import { useState, useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import throttle from 'lodash.throttle'
import SettingIcon from 'lib/assets/setting.svg'
import DraftIcon from 'lib/assets/draft/default.svg'
import { paths } from 'lib/configs/routes'
import IconButton from 'components/common/button/iconButton'
import useCornerRouter from 'lib/application/useCornerRouter'

const NAV_HEIGHT = 40

const TopNavigation = () => {
  const router = useCornerRouter()
  const [concrete, setConcrete] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY >= 185) setConcrete(true)
      else setConcrete(false)
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [concrete])

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 999,
        width: '100%',
        height: NAV_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: '8px',
        backgroundColor: theme =>
          concrete ? theme.palette.dark3.main : theme.palette.dark5.main
      }}
    >
      <Stack direction="row" spacing="12px">
        <IconButton onClick={() => router.push(paths.drafts)}>
          <DraftIcon />
        </IconButton>
        <IconButton onClick={() => router.push(paths.settings)}>
          <SettingIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default TopNavigation
