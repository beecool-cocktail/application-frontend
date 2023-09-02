import useCurrentUser from 'lib/application/user/useCurrentUser'
import AvatarEditor from 'components/common/imageEditor/avatarEditor'
import { UpdateUserAvatarForm } from 'lib/domain/user'
import { CropResult } from 'lib/domain/photo'

const ChangeAvatar = () => {
  const { user, loading, error, updateAvatar } = useCurrentUser()
  if (loading || error || !user) return null

  const handleConfirm = async (result: CropResult) => {
    const updateForm: UpdateUserAvatarForm = {
      originAvatar: result.originImage,
      croppedAvatar: result.croppedImage,
      coordinate: result.coordinate,
      rotation: result.rotation
    }
    await updateAvatar(updateForm)
  }

  return (
    <AvatarEditor
      type="change"
      imgSrc={user.originAvatar}
      cropData={{
        originWidth: user.width,
        originHeight: user.height,
        coordinate: user.coordinate,
        rotation: user.rotation
      }}
      onConfirm={handleConfirm}
    />
  )
}

export default ChangeAvatar
