import Head from 'next/head'
import { Box, Stack } from '@mui/material'
import useCornerRouter from 'lib/application/hooks/useCornerRouter'
import useCurrentUser from 'lib/application/hooks/user/useCurrentUser'
import useAuth from 'lib/application/hooks/auth/useAuth'
import Loading from 'components/common/status/loading'
import ErrorStatus from 'components/common/status/error'
import BasedTopNavigation from 'components/layout/topNavigation'
import Avatar from 'components/common/image/avatar'
import SettingItem from 'components/pages/settings/settingItem'
import SettingItemGroup from 'components/pages/settings/settingItemGroup'
import { pathname } from 'lib/application/configs/routes'
import AboutUsIcon from 'lib/assets/aboutUsOutlined.svg'
import AccountIcon from 'lib/assets/accountOutlined.svg'
import LikeIcon from 'lib/assets/likeSettingPageOutlined.svg'
import CameraIcon from 'lib/assets/cameraOutlined.svg'
import DeleteIcon from 'lib/assets/deleteAvatarOutlined.svg'
import EditIcon from 'lib/assets/editOutlined.svg'
import DonateIcon from 'lib/assets/donateOutlined.svg'
import LogoutIcon from 'lib/assets/logOutOutlined.svg'
import GoogleIcon from 'lib/assets/googleLogo.svg'
import BackButton from 'components/common/button/backButton'
import AuthGuard from 'components/app/authGuard'

const Settings = () => {
  const websiteTitle = '設定 - Corner'
  const router = useCornerRouter()
  const { logout } = useAuth()
  const { user, loading, error, deleteAvatar, updateCollectionPublic } =
    useCurrentUser()

  if (loading) return <Loading />
  if (!user || error) return <ErrorStatus />

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack alignItems="stretch" spacing={2} sx={{ pb: '15px' }}>
        <BasedTopNavigation
          position="static"
          thresholdHeight={185}
          leftSlot={() => <BackButton />}
          title={() => '個人設定'}
        />
        <Stack
          sx={{
            alignItems: 'stretch',
            spacing: '8px',
            px: '16px'
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Avatar
              size={84}
              userId={user.id}
              src={user.croppedAvatar}
              outlined
            />
          </Box>
          <Stack spacing="24px" sx={{ mt: '24px' }}>
            <SettingItemGroup title="更改名稱">
              <SettingItem
                actionType="link"
                icon={<AccountIcon />}
                text={user.username}
                onClick={() => router.push(pathname.editName)}
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
                icon={<AboutUsIcon />}
                text="關於我們"
                onClick={() => router.push(pathname.aboutUs)}
              />
              <SettingItem
                actionType="link"
                icon={<DonateIcon />}
                text="買一杯調酒給我們"
                onClick={() => {
                  window.open(
                    'https://www.buymeacoffee.com/whispering',
                    '_blank'
                  )
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
    </>
  )
}

const SettingsWithAuthGuard = () => {
  return (
    <AuthGuard>
      <Settings />
    </AuthGuard>
  )
}

export default SettingsWithAuthGuard
