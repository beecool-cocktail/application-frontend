import { useState, useRef } from 'react'
import { Stack, Typography } from '@mui/material'
import AvatarEditor, {
  CropResult
} from 'components/common/imageEditor/avatarEditor'
import BasedTopNavigation from 'components/layout/topNavigation'
import useCurrentUser from 'lib/application/user/useCurrentUser'
import { UpdateUserAvatarForm } from 'lib/application/ports'
import Button from 'components/common/button/button'
import BackButton from 'components/common/button/backButton'

const ChangeAvatar = () => {
  const { user, loading, error, updateAvatar } = useCurrentUser()
  const [selectedImage, setSelectedImage] = useState<string>()
  const imageInputRef = useRef<HTMLInputElement>(null)

  if (loading || error || !user) return null

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (!e.target.files) return
    setSelectedImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleUpload = () => {
    imageInputRef.current?.click()
  }

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
              更換大頭貼
            </Typography>
          </Stack>
        )}
      </BasedTopNavigation>
      <Button onClick={handleUpload}>上傳</Button>
      <input
        id="upload"
        ref={imageInputRef}
        onChange={handleChange}
        accept="image/*"
        type="file"
        hidden
      />
      {selectedImage && (
        <AvatarEditor imgSrc={selectedImage} onConfirm={handleConfirm} />
      )}
    </Stack>
  )
}

export default ChangeAvatar
