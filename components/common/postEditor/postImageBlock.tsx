import React from 'react'
import { Stack, TextField, Typography } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { CocktailPostForm } from 'lib/application/ports'
import ImageInput from './imageInput'

interface PostImageBlockProps {
  control: Control<CocktailPostForm>
  previewUrls: string[]
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const PostImageBlock = ({
  control,
  previewUrls,
  onChange
}: PostImageBlockProps) => {
  return (
    <Stack width={1} alignItems="stretch" spacing={2}>
      <Controller
        control={control}
        name="photos"
        render={({ field }) => (
          <Stack spacing={1} component="label">
            <ImageInput size="large" src={previewUrls[0]} />
            <Stack width={1} spacing={1}>
              <Stack width={1} direction="row" spacing={1}>
                <ImageInput src={previewUrls[1]} />
                <ImageInput src={previewUrls[2]} />
              </Stack>
              <Stack width={1} direction="row" spacing={1}>
                <ImageInput src={previewUrls[3]} />
                <ImageInput src={previewUrls[4]} />
              </Stack>
            </Stack>
            <input
              ref={field.ref}
              onChange={e => {
                if (!e.target.files) return
                onChange(e)
                field.onChange(e.target.files)
              }}
              accept="image/*"
              type="file"
              multiple
              hidden
            />
          </Stack>
        )}
      />
      <Stack>
        <Typography>介紹調酒</Typography>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextField placeholder="請輸入文字" multiline rows={5} {...field} />
          )}
        ></Controller>
      </Stack>
    </Stack>
  )
}

export default PostImageBlock
