import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import useUser from 'lib/application/useUser'
import Spinner from 'components/common/status/spinner'
import Error from 'components/common/status/error'
import SettingsForm from 'components/pages/settings/settingsForm'
import LogoutButton from 'components/common/button/logoutButton'
import { paths } from 'lib/configs/routes'
import useConfirmDialog from 'lib/application/useConfirmDialog'
import useSnackbar from 'lib/application/useSnackbar'
import { UpdateUserForm } from 'lib/application/ports'

const Settings = () => {
  const router = useRouter()
  const confirmDialog = useConfirmDialog()
  const snackbar = useSnackbar()
  const { user, loading, error, updateUserInfo } = useUser()

  const handleSubmit = async (formData: UpdateUserForm) => {
    await updateUserInfo(formData)
    snackbar.success('success')
  }

  const handleConfirmDialog = () => {
    confirmDialog.destroy()
    router.push(paths.profile)
  }

  const handleGoBack = async (isDirty: boolean) => {
    if (isDirty)
      confirmDialog.open({
        title: '尚未儲存',
        content: '修改內容還沒儲存，是否要放棄編輯的內容？',
        onConfirm: handleConfirmDialog,
        onCancel: () => confirmDialog.destroy()
      })
    else router.push(paths.profile)
  }

  if (loading) return <Spinner />
  if (!user || error) return <Error />

  return (
    <Stack alignItems="stretch" spacing={2}>
      <SettingsForm user={user} onSubmit={handleSubmit} onBack={handleGoBack} />
      <LogoutButton />
    </Stack>
  )
}

export default Settings
