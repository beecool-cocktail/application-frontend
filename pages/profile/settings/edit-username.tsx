import { useRef } from 'react'
import { Box, Stack } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import BasedTopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import Input from 'components/common/input/input'
import Close from 'lib/assets/cancelClose.svg'
import SubmitButton from 'components/common/button/submitButton'
import { CJKPattern } from 'lib/helper/string'
import useCurrentUser from 'lib/application/user/useCurrentUser'
import useCornerRouter from 'lib/application/useCornerRouter'
import { pathname } from 'lib/configs/routes'
import useConfirmDialog from 'lib/application/ui/useConfirmDialog'
import dialogMessages from 'lib/constants/dialogMessages'

interface UserNameContentProps {
  username: string
  updateUsername: (username: string) => Promise<void>
}

const UserNameContent = ({
  username,
  updateUsername
}: UserNameContentProps) => {
  const { control, handleSubmit, formState, setValue, clearErrors } = useForm({
    mode: 'onChange',
    defaultValues: { username }
  })
  const usernameRef = useRef<HTMLInputElement>()
  const router = useCornerRouter()
  const confirmDialog = useConfirmDialog()

  const handleConfirm = handleSubmit(async data => {
    await updateUsername(data.username)
    router.back()
  })

  const handleCancel = () => () => {
    setValue('username', '')
    usernameRef.current?.focus()
  }

  const handleGoBack = () => {
    if (formState.isDirty)
      confirmDialog.open({
        ...dialogMessages.abortUpdatePost,
        onConfirm: () => {
          router.push(pathname.settings)
          confirmDialog.destroy()
        },
        onCancel: () => confirmDialog.destroy()
      })
    else router.push(pathname.settings)
  }

  return (
    <Stack spacing="44px">
      <BasedTopNavigation
        position="sticky"
        thresholdHeight={185}
        title={() => '更改名稱'}
        leftSlot={() => <BackButton onClick={handleGoBack} />}
        rightSlot={() => (
          <SubmitButton
            onClick={handleConfirm}
            disabled={!formState.isValid || !formState.isDirty}
          />
        )}
      />
      <Box px="32px">
        <Controller
          name="username"
          control={control}
          rules={{
            required: true,
            pattern: CJKPattern
          }}
          render={({ field, fieldState }) => (
            <Input
              inputRef={e => {
                field.ref(e)
                usernameRef.current = e
              }}
              name={field.name}
              value={field.value}
              error={Boolean(fieldState.error)}
              fullWidth
              maxLength={20}
              feedback={
                fieldState.error ? '名稱格式錯誤，建議使用中英文' : undefined
              }
              endAdornment={
                <Box sx={{ cursor: 'pointer' }} onClick={handleCancel}>
                  <Close />
                </Box>
              }
              onBlur={field.onBlur}
              onChange={e => {
                field.onChange(e)
                clearErrors()
              }}
            />
          )}
        ></Controller>
      </Box>
    </Stack>
  )
}

const EditUsername = () => {
  const { user, loading, updateUsername } = useCurrentUser()
  if (!user || loading) return null
  return (
    <UserNameContent username={user.username} updateUsername={updateUsername} />
  )
}

export default EditUsername
