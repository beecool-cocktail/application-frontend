import { Typography } from '@mui/material'
import React from 'react'
import { Stack } from '@mui/material'

const NoMoreHint = () => {
  return (
    <Stack alignItems="center">
      <Stack
        direction="row"
        sx={{
          width: 247,
          height: 17,
          mb: '60px',
          position: 'relative',
          '::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 78,
            height: '1px',
            backgroundColor: theme => theme.palette.light3.main
          },
          '::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 78,
            height: '1px',
            backgroundColor: theme => theme.palette.light3.main
          }
        }}
        justifyContent="center"
      >
        <Typography
          variant="body3"
          textAlign="center"
          sx={{ color: theme => theme.palette.light3.main }}
        >
          酒庫見底了
        </Typography>
      </Stack>
    </Stack>
  )
}

export default NoMoreHint
