import React, { useState } from 'react'
import { Box, Stack, Switch, Typography, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import userApi, { EditSettingsData } from 'lib/api/user'
import { UserInfo } from 'lib/types/user'
import useUserInfo from 'lib/hooks/useUserInfo'
import SettingsHeader from 'components/pages/settings/settingsHeader'
import Avatar from 'components/common/image/avatar'
import storage from 'lib/helper/storage'

interface SettingsFormProps {
  userInfo: UserInfo
}

const SettingsForm = ({ userInfo }: SettingsFormProps) => {
  const { mutate } = useUserInfo()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      user_name: userInfo.user_name,
      file: null,
      is_collection_public: userInfo.is_collection_public
    }
  })
  const onSubmit = async (formData: EditSettingsData) => {
    const token = storage.getToken()
    if (!token) return
    await userApi.editInfo(formData, token)
    mutate()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingsHeader />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        htmlFor="upload"
        component="label"
        style={{ cursor: 'pointer' }}
      >
        <Avatar src={previewUrl || userInfo.photo} size={100} />
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
        {userInfo.email}
      </Typography>
      <Stack component="form" mt={2} px={2} spacing={2}>
        <Controller
          name="user_name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField fullWidth label="用戶名稱" {...field} />
          )}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">公開我的收藏</Typography>
          <Controller
            name="is_collection_public"
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
