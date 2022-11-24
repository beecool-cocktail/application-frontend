import { Box, Stack, Typography } from '@mui/material'
import useCornerRouter from 'lib/application/useCornerRouter'
import useCurrentUser from 'lib/application/user/useCurrentUser'
import useAuth from 'lib/application/useAuth'
import Loading from 'components/common/status/loading'
import ErrorStatus from 'components/common/status/error'
import BasedTopNavigation from 'components/layout/topNavigation'
import Avatar from 'components/common/image/avatar'
import SettingItem from 'components/pages/settings/settingItem'
import SettingItemGroup from 'components/pages/settings/settingItemGroup'
import { pathname } from 'lib/configs/routes'
import AccountIcon from 'lib/assets/accountOutlined.svg'
import LikeIcon from 'lib/assets/likeSettingPageOutlined.svg'
import CameraIcon from 'lib/assets/cameraOutlined.svg'
import DeleteIcon from 'lib/assets/deleteAvatarOutlined.svg'
import EditIcon from 'lib/assets/editOutlined.svg'
import DonateIcon from 'lib/assets/donateOutlined.svg'
import ShakerIcon from 'lib/assets/shakerOutlined.svg'
import LogoutIcon from 'lib/assets/logOutOutlined.svg'
import GoogleIcon from 'lib/assets/googleLogo.svg'
import BackButton from 'components/common/button/backButton'

const Settings = () => {
  const router = useCornerRouter()
  const { logout } = useAuth()
  const { user, loading, error, deleteAvatar, updateCollectionPublic } =
    useCurrentUser()

  if (loading) return <Loading />
  if (!user || error) return <ErrorStatus />

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
              px: '16px',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                width: '100%',
                height: '100%',
                justifySelf: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body1" color="light1">
                個人設定
              </Typography>
            </Box>
            <BackButton onClick={() => router.push(pathname.profile)} />
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
              icon={<AccountIcon />}
              text={user.username}
              onClick={() => router.push(pathname.editUsername)}
            />
          </SettingItemGroup>
          <SettingItemGroup>
            <SettingItem
              actionType="link"
              icon={<CameraIcon />}
              text="更換大頭貼"
              onClick={() => router.push(pathname.changeAvatar)}
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
              onClick={deleteAvatar}
            />
          </SettingItemGroup>
          <SettingItemGroup>
            <SettingItem
              actionType="switch"
              icon={<LikeIcon />}
              text="公開我的收藏"
              switchValue={user.isCollectionPublic}
              onClick={updateCollectionPublic}
            />
            <SettingItem icon={<GoogleIcon />} text={user.email} />
          </SettingItemGroup>
          <SettingItemGroup>
            <SettingItem
              actionType="link"
              icon={<ShakerIcon />}
              text="關於我們"
              switchValue={user.isCollectionPublic}
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
              actionType="danger"
              icon={<LogoutIcon />}
              text="登出"
              onClick={() => logout(user.id)}
            />
          </SettingItemGroup>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Settings
