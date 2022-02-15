import React from 'react'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { CocktailPostForm } from 'lib/types/cocktail'

interface PostImageBlockProps {
  control: Control<CocktailPostForm>
}

const PostImageBlock = ({ control }: PostImageBlockProps) => {
  const handleAdd = () => {
    // TODO
  }

  return (
    <Stack width={1} alignItems="stretch" spacing={2}>
      <Stack spacing={1}>
        <Box
          width={1}
          height={200}
          bgcolor="#ddd"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize={50}
          style={{ cursor: 'pointer' }}
          onClick={handleAdd}
        >
          +
        </Box>
        <Stack width={1} spacing={1}>
          <Stack width={1} direction="row" spacing={1}>
            <Box
              bgcolor="#ddd"
              flex={1}
              height={100}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={40}
            >
              +
            </Box>
            <Box
              bgcolor="#ddd"
              flex={1}
              height={100}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={40}
            >
              +
            </Box>
          </Stack>
          <Stack width={1} direction="row" spacing={1}>
            <Box
              bgcolor="#ddd"
              flex={1}
              height={100}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={40}
            >
              +
            </Box>
            <Box
              bgcolor="#ddd"
              flex={1}
              height={100}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={40}
            >
              +
            </Box>
          </Stack>
        </Stack>
      </Stack>
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
