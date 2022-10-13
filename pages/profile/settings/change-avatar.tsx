import useCurrentUser from 'lib/application/user/useCurrentUser'
import { UpdateUserAvatarForm } from 'lib/application/ports'
import WholePageSpinner from 'components/common/status/wholePageSpinner'
import AvatarEditor from 'components/common/imageEditor/avatarEditor'
import { CropResult } from 'components/common/imageEditor/avatarEditor'
import useCornerRouter from 'lib/application/useCornerRouter'
import { paths } from 'lib/configs/routes'

const ChangeAvatar = () => {
  const router = useCornerRouter()
  const { user, loading, imageUpdating, error, updateAvatar } = useCurrentUser()
  if (loading || error || !user) return null

  const handleConfirm = async (result: CropResult) => {
    const updateForm: UpdateUserAvatarForm = {
      originAvatar: result.originAvatar,
      croppedAvatar: result.croppedAvatar,
      coordinate: result.coordinate
    }
    await updateAvatar(updateForm)
    router.push(paths.settings)
  }

  return (
    <WholePageSpinner loading={imageUpdating}>
      <AvatarEditor
        type="change"
        imgSrc={user.originAvatar}
        aspect={1 / 1}
        cropData={{
          originWidth: user.width,
          originHeight: user.height,
          coordinate: user.coordinate
        }}
        onConfirm={handleConfirm}
      />
    </WholePageSpinner>
  )
}

export default ChangeAvatar
