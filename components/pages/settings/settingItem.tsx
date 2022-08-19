import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import NextIcon from 'lib/assets/next.svg'

interface SettingItemProps {
  actionType?: 'normal' | 'link' | 'switch'
  icon: React.ReactNode
  text: React.ReactNode
}

const SettingItem = ({
  actionType = 'normal',
  icon,
  text
}: SettingItemProps) => {
  const renderAdornment = () => {
    switch (actionType) {
      case 'normal':
        return null
      case 'link':
        return (
          <Box fontSize={24}>
            <NextIcon />
          </Box>
        )
      case 'switch':
        return <Box fontSize={24}></Box>
    }
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="16px"
      sx={{
        width: 1,
        padding: '14px 10px',
        backgroundColor: theme => theme.palette.dark5.main,
        cursor: 'pointer'
      }}
    >
      <Box fontSize={24} color={theme => theme.palette.light1.main}>
        {icon}
      </Box>
      <Typography
        flex={1}
        variant="body2"
        color={theme => theme.palette.light1.main}
      >
        {text}
      </Typography>
      {renderAdornment()}
    </Stack>
  )
}

export default SettingItem
