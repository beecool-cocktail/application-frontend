import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Stack,
  Switch,
  Typography,
  TextField
} from '@mui/material'
import useAuth from '../hooks/useAuth'
import Avatar from '../components/profile/avatar'
import SettingsHeader from '../components/settings/settingsHeader'
import storage from '../helper/storage'
import { UserInfo } from '../api/user'

const Settings = () => {
  const { logout } = useAuth()
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)
  useEffect(() => {
    const userInfo = storage.getUserInfo()
    if (!userInfo) return
    userInfo.photo = '/cocktail.jpg'
    setUserInfo(userInfo)
  }, [])

  if (!userInfo) return null

  return (
    <Stack alignItems="stretch" spacing={2}>
      <SettingsHeader />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Avatar src={userInfo.photo} size={100} />
      </Box>
      <Typography variant="h6" textAlign="center">
        {userInfo.email}
      </Typography>
      <Stack component="form" mt={2} px={2} spacing={2}>
        <TextField
          fullWidth
          label="用戶名稱"
          defaultValue={userInfo.user_name}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">公開我的收藏</Typography>
          <Switch defaultChecked />
        </Stack>
      </Stack>
      <Button onClick={logout}>Logout</Button>
    </Stack>
  )
}

export default Settings
