import { Stack } from '@mui/material'
import useUserInfo from 'lib/hooks/useUserInfo'
import Spinner from 'components/common/status/spinner'
import Error from 'components/common/status/error'
import SettingsForm from 'components/pages/settings/settingsForm'
import LogoutButton from 'components/common/button/logoutButton'

const Settings = () => {
  const { userInfo, loading, error } = useUserInfo()
  if (loading) return <Spinner />
  if (!userInfo || error) return <Error />

  return (
    <Stack alignItems="stretch" spacing={2}>
      <SettingsForm userInfo={userInfo} />
      <LogoutButton />
    </Stack>
  )
}

export default Settings
