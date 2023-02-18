import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import LoginIcon from 'lib/assets/logInOutlined.svg'
import AboutUsIcon from 'lib/assets/aboutUsOutlined.svg'
import DonateIcon from 'lib/assets/donateOutlined.svg'
import useCornerRouter from 'lib/application/useCornerRouter'
import { pathname } from 'lib/configs/routes'
import useAuth from 'lib/application/useAuth'
import Avatar from 'components/common/image/avatar'
import SettingItemGroup from '../settings/settingItemGroup'
import SettingItem from '../settings/settingItem'

const AnonymousProfile = () => {
  const router = useCornerRouter()
  const auth = useAuth()

  return (
    <Stack
      alignItems="stretch"
      spacing={2}
      sx={{
        minHeight: '100vh',
        backgroundColor: theme => theme.palette.dark3.main,
        pb: '15px'
      }}
    >
      <Stack
        sx={{
          alignItems: 'stretch',
          spacing: '8px',
          px: '16px'
        }}
      >
        <Stack alignItems="center" justifyContent="center" height={40}>
          <Typography
            variant="body1"
            sx={{ color: theme => theme.palette.light1.main }}
          >
            尚未登入
          </Typography>
        </Stack>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="12px"
        >
          <Avatar size={70} src="/icon.png" outlined />
        </Box>
        <Stack spacing="24px" sx={{ mt: '24px' }}>
          <SettingItemGroup>
            <SettingItem
              actionType="link"
              icon={<AboutUsIcon />}
              text="關於我們"
              onClick={() => router.push(pathname.aboutUs)}
            />
            <SettingItem
              actionType="link"
              icon={<DonateIcon />}
              text="買一杯調酒給我們"
              onClick={() => {
                window.open('https://www.buymeacoffee.com/whispering', '_blank')
              }}
            />
          </SettingItemGroup>
          <SettingItemGroup>
            <SettingItem
              actionType="primary"
              icon={<LoginIcon />}
              text="登入 或 使用 Google 帳號註冊"
              onClick={() => auth.askUserPermission()}
            />
          </SettingItemGroup>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AnonymousProfile
