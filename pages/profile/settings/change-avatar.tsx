import Head from 'next/head'
import useCurrentUser from 'lib/application/user/useCurrentUser'
import AvatarEditor from 'components/common/imageEditor/avatarEditor'
import { UpdateUserAvatarForm } from 'lib/domain/user'
import { CropResult } from 'lib/domain/photo'

const ChangeAvatar = () => {
  const websiteTitle = '更換大頭貼 - Corner'

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
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  )
}

export default ChangeAvatar
