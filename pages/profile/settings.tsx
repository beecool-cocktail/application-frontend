import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import useCurrentUser from 'lib/application/user/useCurrentUser'
import Loading from 'components/common/status/loading'
import Error from 'components/common/status/error'
import SettingsForm from 'components/pages/settings/settingsForm'
import LogoutButton from 'components/common/button/logoutButton'
import { pathname } from 'lib/configs/routes'
import useConfirmDialog from 'lib/application/ui/useConfirmDialog'
import useSnackbar from 'lib/application/ui/useSnackbar'
import { UpdateUserForm } from 'lib/application/ports'

const Settings = () => {
  const router = useRouter()
  const confirmDialog = useConfirmDialog()
  const snackbar = useSnackbar()
  const { user, loading, error, updateUserInfo } = useCurrentUser()

  const handleSubmit = async (formData: UpdateUserForm) => {
    await updateUserInfo(formData)
    snackbar.success('success')
  }

  const handleConfirmDialog = () => {
    confirmDialog.destroy()
    router.push(pathname.profile)
  }

  const handleGoBack = async (isDirty: boolean) => {
    if (isDirty)
      confirmDialog.open({
        title: '尚未儲存',
        content: '修改內容還沒儲存，是否要放棄編輯的內容？',
        onConfirm: handleConfirmDialog,
        onCancel: () => confirmDialog.destroy()
      })
    else router.push(pathname.profile)
  }

  if (loading) return <Loading />
  if (!user || error) return <Error />

  return (
    <Stack alignItems="stretch" spacing={2}>
      <SettingsForm user={user} onSubmit={handleSubmit} onBack={handleGoBack} />
      <LogoutButton />
    </Stack>
  )
}

export default Settings
