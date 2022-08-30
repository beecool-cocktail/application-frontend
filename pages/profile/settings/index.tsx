import { Stack } from '@mui/material'
import LikeIcon from 'lib/assets/like/likeDefault.svg'
import useCornerRouter from 'lib/application/useCornerRouter'
import useCurrentUser from 'lib/application/user/useCurrentUser'
import Loading from 'components/common/status/loading'
import Error from 'components/common/status/error'
// import SettingsForm from 'components/pages/settings/settingsForm'
import LogoutButton from 'components/common/button/logoutButton'
import Avatar from 'components/common/image/avatar'
import SettingItem from 'components/pages/settings/settingItem'
import SettingItemGroup from 'components/pages/settings/settingItemGroup'
import { pathname } from 'lib/configs/routes'
// import useConfirmDialog from 'lib/application/ui/useConfirmDialog'
// import useSnackbar from 'lib/application/ui/useSnackbar'
// import { UpdateUserForm } from 'lib/application/ports'
import CameraIcon from 'lib/assets/camera.svg'
import DeleteIcon from 'lib/assets/delete.svg'
import EditIcon from 'lib/assets/edit.svg'

const Settings = () => {
  const router = useCornerRouter()
  // const confirmDialog = useConfirmDialog()
  // const snackbar = useSnackbar()
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

  if (loading) return <Loading />
  if (!user || error) return <Error />

  return (
    <Stack alignItems="stretch" spacing={2}>
      <Avatar size={84} />
      <SettingItemGroup title="更改名稱">
        <SettingItem
          icon={<CameraIcon />}
          text={user.username}
          actionType="link"
          onClick={() => router.push(pathname.editUsername)}
        />
      </SettingItemGroup>
      <SettingItemGroup>
        <SettingItem
          icon={<CameraIcon />}
          text="更換大頭貼"
          onClick={() => router.push(pathname.editAvatar)}
        />
        <SettingItem
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
          icon={<LikeIcon />}
          text="公開我的收藏"
          onClick={handleCollectionSwitch}
        />
        <SettingItem icon={<CameraIcon />} text={user.email} />
      </SettingItemGroup>
      <LogoutButton />
      {/* <SettingsForm user={user} onSubmit={handleSubmit} onBack={handleGoBack} /> */}
    </Stack>
  )
}

export default Settings
