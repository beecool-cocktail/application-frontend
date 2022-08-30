import { Box, Stack, Typography } from '@mui/material'
import useCornerRouter from 'lib/application/useCornerRouter'
import useCurrentUser from 'lib/application/user/useCurrentUser'
import useAuth from 'lib/application/useAuth'
import Loading from 'components/common/status/loading'
import Error from 'components/common/status/error'
import BasedTopNavigation from 'components/layout/topNavigation'
import Avatar from 'components/common/image/avatar'
import SettingItem from 'components/pages/settings/settingItem'
import SettingItemGroup from 'components/pages/settings/settingItemGroup'
import { pathname } from 'lib/configs/routes'
import LikeIcon from 'lib/assets/like/likeDefault.svg'
import ConfirmIcon from 'lib/assets/confirm.svg'
import CameraIcon from 'lib/assets/camera.svg'
import DeleteIcon from 'lib/assets/delete.svg'
import EditIcon from 'lib/assets/edit.svg'
import LogoutIcon from 'lib/assets/logOut.svg'
import BackButton from 'components/common/button/backButton'
import IconButton from 'components/common/button/iconButton'
// import SettingsForm from 'components/pages/settings/settingsForm'
// import useConfirmDialog from 'lib/application/ui/useConfirmDialog'
// import useSnackbar from 'lib/application/ui/useSnackbar'
// import { UpdateUserForm } from 'lib/application/ports'

const Settings = () => {
  const router = useCornerRouter()
  // const confirmDialog = useConfirmDialog()
  // const snackbar = useSnackbar()
  const { logout } = useAuth()
  const { user, loading, error } = useCurrentUser()
  // const { user, loading, error, updateUserInfo } = useCurrentUser()

  // const handleSubmit = async (formData: UpdateUserForm) => {
  //   await updateUserInfo(formData)
  //   snackbar.success('success')
  // }

  // const handleConfirmDialog = () => {
  //   confirmDialog.destroy()
  //   router.push(pathname.profile)
  // }

  // const handleGoBack = async (isDirty: boolean) => {
  //   if (isDirty)
  //     confirmDialog.open({
  //       title: '尚未儲存',
  //       content: '修改內容還沒儲存，是否要放棄編輯的內容？',
  //       onConfirm: handleConfirmDialog,
  //       onCancel: () => confirmDialog.destroy()
  //     })
  //   else router.push(pathname.profile)
  // }

  const handleDeleteAvatar = () => {
    // console.log('delete avatar')
  }

  const handleCollectionSwitch = () => {
    // console.log('handle collection switch')
  }

  const handleConfirm = () => {
    // TODO
  }

  if (loading) return <Loading />
  if (!user || error) return <Error />

  return (
    <Stack
      alignItems="stretch"
      spacing={2}
      sx={{
        minHeight: '100vh',
        backgroundColor: theme => theme.palette.dark3.main
      }}
    >
      <BasedTopNavigation position="sticky" thresholdHeight={185}>
        {() => (
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 1,
              height: 1,
              px: '16px'
            }}
          >
            <BackButton />
            <Typography variant="body1" color="light1">
              個人設定
            </Typography>
            <IconButton onClick={handleConfirm}>
              <ConfirmIcon />
            </IconButton>
          </Stack>
        )}
      </BasedTopNavigation>
      <Stack
        sx={{
          alignItems: 'stretch',
          spacing: '8px',
          px: '16px'
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Avatar size={84} userId={user.id} src={user.photo} />
        </Box>
        <Stack spacing="24px" sx={{ mt: '24px' }}>
          <SettingItemGroup title="更改名稱">
            <SettingItem
              actionType="link"
              icon={<CameraIcon />}
              text={user.username}
              onClick={() => router.push(pathname.editUsername)}
            />
          </SettingItemGroup>
          <SettingItemGroup>
            <SettingItem
              actionType="link"
              icon={<CameraIcon />}
              text="更換大頭貼"
              onClick={() => router.push(pathname.editAvatar)}
            />
            <SettingItem
              actionType="link"
              icon={<EditIcon />}
              text="編輯大頭貼"
              onClick={() => router.push(pathname.editAvatar)}
            />
            <SettingItem
              icon={<DeleteIcon />}
              text="刪除大頭貼"
              onClick={handleDeleteAvatar}
            />
          </SettingItemGroup>
          <SettingItemGroup>
            <SettingItem
              actionType="switch"
              icon={<LikeIcon />}
              text="公開我的收藏"
              onClick={handleCollectionSwitch}
            />
            <SettingItem icon={<CameraIcon />} text={user.email} />
          </SettingItemGroup>
          <SettingItemGroup>
            <SettingItem
              actionType="danger"
              icon={<LogoutIcon />}
              text="登出"
              onClick={() => logout(user.id)}
            />
          </SettingItemGroup>
          {/* <SettingsForm user={user} onSubmit={handleSubmit} onBack={handleGoBack} /> */}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Settings
