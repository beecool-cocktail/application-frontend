import { Stack, Typography } from '@mui/material'
import AvatarEditor, {
  CropResult
} from 'components/common/imageEditor/avatarEditor'
import BasedTopNavigation from 'components/layout/topNavigation'
import useCurrentUser from 'lib/application/user/useCurrentUser'
import { UpdateUserAvatarForm } from 'lib/application/ports'
import BackButton from 'components/common/button/backButton'

const EditAvatar = () => {
  const { user, loading, error, updateAvatar } = useCurrentUser()
  if (loading || error || !user) return null

  const handleConfirm = async (result: CropResult) => {
    const updateForm: UpdateUserAvatarForm = {
      originAvatar: result.originAvatar,
      croppedAvatar: result.croppedAvatar,
      coordinate: result.coordinate
    }
    await updateAvatar(updateForm)
  }

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        bgcolor: theme => theme.palette.dark3.main,
        alignItems: 'center'
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
              backgroundColor: theme => theme.palette.dark3.main
            }}
          >
            <BackButton />
            <Typography variant="body1" color="light1">
              編輯大頭貼
            </Typography>
          </Stack>
        )}
      </BasedTopNavigation>
      <AvatarEditor imgSrc={user.originAvatar} onConfirm={handleConfirm} />
    </Stack>
  )
}

export default EditAvatar