import React from 'react'
import Image from 'next/image'
import { Box, Stack, Typography } from '@mui/material'
import Button from 'components/common/button/button'

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
      <Box mt="51px">
        <Button size="large" onClick={onRetry}>
          重新整理
        </Button>
      </Box>
    </Stack>
  )
}

export default ErrorRetry
