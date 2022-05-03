import React from 'react'
import Image from 'next/image'
import { Box, Stack, Typography } from '@mui/material'
import { Button } from '@mui/material'

interface ErrorRetryProps {
  onRetry?(): void
}

const ErrorRetry = ({ onRetry }: ErrorRetryProps) => {
  return (
    <Stack alignItems="center" pt="162px">
      <Stack alignItems="center" spacing="18px">
        <Typography fontSize={32} color="white" fontWeight={700}>
          Whoops !
        </Typography>
        <Box
          sx={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Image
            layout="fill"
            src="/broken-cocktail-glass.jpg"
            alt="讀取資料出錯"
          />
        </Box>
        <Typography sx={{ fontSize: 18, color: 'white', fontWeight: 700 }}>
          讀取資料出錯
        </Typography>
      </Stack>
      <Button
        onClick={onRetry}
        sx={{
          mt: '51px',
          width: 311,
          height: 52,
          color: 'white',
          backgroundColor: theme => theme.palette.primary.main,
          ':hover': {
            backgroundColor: theme => theme.palette.primary.lighter
          }
        }}
      >
        <Typography variant="subtitle2">重新整理</Typography>
      </Button>
    </Stack>
  )
}

export default ErrorRetry
