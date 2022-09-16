import { useRef } from 'react'
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
  const { control, handleSubmit, formState, setValue, clearErrors } = useForm({
    mode: 'onBlur',
    defaultValues: { username }
  })
  const usernameRef = useRef<HTMLInputElement>()
  const router = useCornerRouter()
  const confirmDialog = useConfirmDialog()

  const handleConfirm = () =>
    handleSubmit(data => updateUsername(data.username))

  const handleCancel = () => () => {
    setValue('username', '')
    usernameRef.current?.focus()
  }

  const handleGoBack = () => {
    if (formState.isDirty)
      confirmDialog.open({
        title: '尚未儲存',
        content: '修改內容還沒儲存，是否要放棄編輯的內容？',
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
              {...field}
              onChange={(...args) => {
                field.onChange(...args)
                clearErrors()
              }}
              inputRef={e => {
                field.ref(e)
                usernameRef.current = e
              }}
              // getLetterCount={getCharacterCount}
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
