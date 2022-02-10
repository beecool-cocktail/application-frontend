import { Alert, Snackbar, Stack } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useUserInfo from 'lib/hooks/useUserInfo'
import Spinner from 'components/common/status/spinner'
import Error from 'components/common/status/error'
import SettingsForm from 'components/pages/settings/settingsForm'
import LogoutButton from 'components/common/button/logoutButton'
import ConfirmDialog from 'components/common/dialog/confirmDialog'
import storage from 'lib/helper/storage'
import userApi, { EditSettingsData } from 'lib/api/user'
import { paths } from 'lib/configs/routes'

const DURATION = 3000

const Settings = () => {
  const router = useRouter()
  const { userInfo, loading, error, mutate } = useUserInfo()
  const [isSnackbarOpen, setSnackbarOpen] = useState(false)
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [isFormDirty, setFormDirty] = useState(false)

  const handleCloseSnackbar = () => setSnackbarOpen(false)
  const handleCancelDialog = () => setConfirmDialogOpen(false)
  const handleConfirmDialog = () => {
    setConfirmDialogOpen(false)
    router.push(paths.profile)
  }
  const handleSubmit = async (formData: EditSettingsData) => {
    const token = storage.getToken()
    if (!token) return
    await userApi.editInfo(formData, token)
    mutate()
    setSnackbarOpen(true)
    setFormDirty(false)
  }

  const handleGoBack = async () => {
    if (isFormDirty) setConfirmDialogOpen(true)
    else router.push(paths.profile)
  }

  if (loading) return <Spinner />
  if (!userInfo || error) return <Error />

  return (
    <Stack alignItems="stretch" spacing={2}>
      <SettingsForm
        userInfo={userInfo}
        onSubmit={handleSubmit}
        onChange={() => setFormDirty(true)}
        onBack={handleGoBack}
      />
      <LogoutButton />
      <ConfirmDialog
        open={isConfirmDialogOpen}
        title="尚未儲存"
        content="修改內容還沒儲存，是否要放棄編輯的內容？"
        onConfirm={handleConfirmDialog}
        onCancel={handleCancelDialog}
      />
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={DURATION}
      >
        <Alert severity="success">Saved</Alert>
      </Snackbar>
    </Stack>
  )
}

export default Settings
