import {
  Box,
  Button,
  Stack,
  Switch,
  Typography,
  TextField
} from '@mui/material'
import Avatar from 'components/common/image/avatar'
import SettingsHeader from 'components/pages/settings/settingsHeader'
import useAuth from 'lib/hooks/useAuth'
import useUserInfo from 'lib/hooks/useUserInfo'
import Spinner from 'components/common/status/spinner'

const Settings = () => {
  const { logout } = useAuth()
  const { userInfo, loading, error } = useUserInfo()
  if (loading) return <Spinner />
  if (!userInfo || error) return <Typography>error</Typography>

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
      <Button onClick={() => logout(userInfo.user_id)}>Logout</Button>
    </Stack>
  )
}

export default Settings
