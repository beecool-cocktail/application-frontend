import { CropResult } from 'components/common/imageEditor/avatarEditor'
import useCurrentUser from 'lib/application/user/useCurrentUser'
import { UpdateUserAvatarForm } from 'lib/application/ports'
import AvatarEditor from 'components/common/imageEditor/avatarEditor'
import WholePageSpinner from 'components/common/status/wholePageSpinner'
import useCornerRouter from 'lib/application/useCornerRouter'
import { paths } from 'lib/configs/routes'

const EditAvatar = () => {
  const router = useCornerRouter()
  const { user, loading, imageUpdating, error, updateAvatar } = useCurrentUser()
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
    <WholePageSpinner loading={imageUpdating}>
      <AvatarEditor
        type="edit"
        imgSrc={user.originAvatar}
        cropData={{
          originWidth: user.width,
          originHeight: user.height,
          coordinate: user.coordinate,
          rotation: user.rotation
        }}
        aspect={1 / 1}
        onConfirm={handleConfirm}
      />
    </WholePageSpinner>
  )
}

export default EditAvatar
