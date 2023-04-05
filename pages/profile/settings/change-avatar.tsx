import useCurrentUser from 'lib/application/user/useCurrentUser'
import AvatarEditor from 'components/common/imageEditor/avatarEditor'
import { CropResult } from 'components/common/imageEditor/avatarEditor'
import useCornerRouter from 'lib/application/useCornerRouter'
import { paths } from 'lib/configs/routes'
import { UpdateUserAvatarForm } from 'lib/domain/user'

const ChangeAvatar = () => {
  const router = useCornerRouter()
  const { user, loading, error, updateAvatar } = useCurrentUser()
  if (loading || error || !user) return null

  const handleConfirm = async (result: CropResult) => {
    const updateForm: UpdateUserAvatarForm = {
      originAvatar: result.originAvatar,
      croppedAvatar: result.croppedAvatar,
      coordinate: result.coordinate,
      rotation: result.rotation
    }
    await updateAvatar(updateForm)
    router.push(paths.settings)
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
