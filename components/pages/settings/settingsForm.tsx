import React, { useEffect, useState } from 'react'
import { Box, Stack, Switch, Typography, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { CurrentUser } from 'lib/domain/user'
import { UpdateUserForm } from 'lib/application/ports'
import SettingsHeader from 'components/pages/settings/settingsHeader'
import Avatar from 'components/common/image/avatar'

interface SettingsFormProps {
  user: CurrentUser
  onSubmit(formData: UpdateUserForm): void
  onBack(isDirty: boolean): void
}

const SettingsForm = ({ user, onSubmit, onBack }: SettingsFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { isValid, isDirty, errors, isSubmitSuccessful }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
      file: undefined,
      isCollectionPublic: user.isCollectionPublic
    }
  })

  useEffect(() => {
    if (!isSubmitSuccessful) return
    reset({
      username: user.username,
      isCollectionPublic: user.isCollectionPublic,
      file: undefined
    })
  }, [reset, isSubmitSuccessful, user])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingsHeader isDirty={isDirty} isValid={isValid} onBack={onBack} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        htmlFor="upload"
        component="label"
        style={{ cursor: 'pointer' }}
      >
        <Avatar src={previewUrl || user.photo} size={100} />
        <input
          id="upload"
          {...register('file', {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.target.files) return
              setPreviewUrl(URL.createObjectURL(e.target.files[0]))
            }
          })}
          accept="image/*"
          type="file"
          hidden
        />
      </Box>
      <Typography variant="h6" textAlign="center">
        {user.email}
      </Typography>
      <Stack component="form" mt={2} px={2} spacing={2}>
        <Controller
          name="username"
          control={control}
          rules={{
            required: true,
            maxLength: 20,
            // Unicode u+4E00..u+9FFF: CJK Unified Ideographs
            // reference: https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_(Unicode_block)
            pattern: /^[\u4E00-\u9FFF\w_.]+$/
          }}
          render={({ field }) => (
            <TextField
              fullWidth
              label="用戶名稱"
              inputProps={{ maxLength: 20 }}
              error={!!errors.username}
              {...field}
            />
          )}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">公開我的收藏</Typography>
          <Controller
            name="isCollectionPublic"
            control={control}
            render={({ field }) => (
              <Switch
                onChange={e => field.onChange(e.target.checked)}
                checked={field.value}
              />
            )}
          />
        </Stack>
      </Stack>
    </form>
  )
}

export default SettingsForm
