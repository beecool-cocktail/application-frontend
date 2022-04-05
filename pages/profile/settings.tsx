import { Stack } from '@mui/material'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import useUserInfo from 'lib/hooks/useUserInfo'
import Spinner from 'components/common/status/spinner'
import Error from 'components/common/status/error'
import SettingsForm from 'components/pages/settings/settingsForm'
import LogoutButton from 'components/common/button/logoutButton'
import userApi, { EditSettingsData } from 'lib/api/user'
import useLocalStorage from 'lib/services/localStorageAdapter'
import SnackbarContext from 'lib/context/snackbarContext'
import { paths } from 'lib/configs/routes'
import { ConfirmDialogContext } from 'components/app/confirmDialogWrapper'

const Settings = () => {
  const router = useRouter()
  const { api: confirmDialogApi } = useContext(ConfirmDialogContext)
  const { api: snackbar } = useContext(SnackbarContext)
  const { userInfo, loading, error, mutate } = useUserInfo()
  const storage = useLocalStorage()

  const handleSubmit = async (formData: EditSettingsData) => {
    const token = storage.getToken()
    if (!token) return
    await userApi.editInfo(formData, token)
    await mutate()
    snackbar.success({ message: 'success' })
  }

  const handleConfirmDialog = () => {
    confirmDialogApi.destroy()
    router.push(paths.profile)
  }

  const handleGoBack = async (isDirty: boolean) => {
    if (isDirty)
      confirmDialogApi.open({
        title: '尚未儲存',
        content: '修改內容還沒儲存，是否要放棄編輯的內容？',
        onConfirm: handleConfirmDialog,
        onCancel: () => confirmDialogApi.destroy()
      })
    else router.push(paths.profile)
  }

  if (loading) return <Spinner />
  if (!userInfo || error) return <Error />

  return (
    <Stack alignItems="stretch" spacing={2}>
      <SettingsForm
        userInfo={userInfo}
        onSubmit={handleSubmit}
        onBack={handleGoBack}
      />
      <LogoutButton />
    </Stack>
  )
}

export default Settings
