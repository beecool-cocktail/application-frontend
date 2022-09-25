import { useState, useRef } from 'react'
import { Box, Stack, Typography } from '@mui/material'
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

interface UserNameContentProps {
  username: string
  updateUsername: (username: string) => Promise<void>
}

const UserNameContent = ({
  username,
  updateUsername
}: UserNameContentProps) => {
  const {
    control,
    handleSubmit,
    formState,
    setValue,
    getValues,
    clearErrors,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: { username }
  })
  const usernameRef = useRef<HTMLInputElement>()
  const router = useCornerRouter()
  const confirmDialog = useConfirmDialog()

  const handleConfirm = handleSubmit(async data => {
    await updateUsername(data.username)
    reset({ username: data.username })
  })

  const handleCancel = () => () => {
    setValue('username', '')
    usernameRef.current?.focus()
  }

  const [isComposing, setIsComposing] = useState(false)
  const [compositionValue, setCompositionValue] = useState('')

  const handleCompositionStart = () => {
    setIsComposing(true)
    setCompositionValue(getValues().username)
  }

  const handleCompositionEnd = () => {
    setIsComposing(false)
    setValue('username', compositionValue, {
      shouldValidate: true,
      shouldDirty: true
    })
    setCompositionValue('')
  }

  const handleGoBack = () => {
    if (formState.isDirty)
      confirmDialog.open({
        title: '尚未儲存',
        content: '修改內容還沒儲存，是否要放棄編輯的內容？',
        primaryButton: 'cancel',
        onConfirm: () => {
          router.push(pathname.settings)
          confirmDialog.destroy()
        },
        onCancel: () => confirmDialog.destroy()
      })
    else router.push(pathname.settings)
  }

  return (
    <Stack
      spacing="44px"
      minHeight="100vh"
      sx={{ backgroundColor: theme => theme.palette.dark3.main }}
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
              px: '16px'
            }}
          >
            <BackButton onClick={handleGoBack} />
            <Typography variant="body1" color="light1">
              更改名稱
            </Typography>
            <SubmitButton
              onClick={handleConfirm}
              disabled={!formState.isValid || !formState.isDirty}
            />
          </Stack>
        )}
      </BasedTopNavigation>
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
                if (isComposing) return setCompositionValue(e.target.value)
                field.onChange(e)
                clearErrors()
              }}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
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
