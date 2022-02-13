import React from 'react'
import { OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddButton from 'components/common/button/addButton'

const PostTutorial = () => {
  const handleAdd = () => {
    // TODO
  }

  return (
    <Stack spacing={4} width={1}>
      <TextField required label="調酒名稱" fullWidth />
      <Stack>
        <Typography>備料清單</Typography>
        <Stack spacing={2}>
          <Stack direction="row" display="flex" flexDirection="row" spacing={1}>
            <Box flex={1}>
              <OutlinedInput placeholder="輸入材料" fullWidth />
            </Box>
            <Box width={100}>
              <OutlinedInput placeholder="數量/單位" fullWidth />
            </Box>
          </Stack>
          <Stack direction="row" display="flex" flexDirection="row" spacing={1}>
            <Box flex={1}>
              <OutlinedInput placeholder="輸入材料" fullWidth />
            </Box>
            <Box width={100}>
              <OutlinedInput placeholder="數量/單位" fullWidth />
            </Box>
          </Stack>
        </Stack>
        <AddButton onClick={handleAdd} />
      </Stack>
      <Stack>
        <Typography>步驟教學</Typography>
        <Stack spacing={2} width={1}>
          <OutlinedInput placeholder="輸入步驟" fullWidth />
          <OutlinedInput placeholder="輸入步驟" fullWidth />
        </Stack>
        <AddButton onClick={handleAdd} />
      </Stack>
    </Stack>
  )
}

export default PostTutorial
