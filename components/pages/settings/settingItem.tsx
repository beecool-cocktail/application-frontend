import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import NextIcon from 'lib/assets/next.svg'
import SwitchOnIcon from 'lib/assets/switchControlOn.svg'
import SwitchOffIcon from 'lib/assets/switchControlOff.svg'

interface SettingItemProps {
  actionType?: 'normal' | 'link' | 'switch' | 'danger'
  icon: React.ReactNode
  text: React.ReactNode
  switchValue?: boolean
  onClick?: () => void
}

const SettingItem = ({
  actionType = 'normal',
  icon,
  text,
  switchValue,
  onClick
}: SettingItemProps) => {
  const renderAdornment = () => {
    switch (actionType) {
      case 'normal':
        return null
      case 'link':
        return (
          <Box fontSize={24} lineHeight={0}>
            <NextIcon />
          </Box>
        )
      case 'switch':
        return (
          <Box
            fontSize={34}
            lineHeight={0}
            color={theme =>
              switchValue ? theme.palette.blue.main : theme.palette.light3.main
            }
          >
            {switchValue ? <SwitchOnIcon /> : <SwitchOffIcon />}
          </Box>
        )
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
      onClick={onClick}
    >
      <Box
        fontSize={24}
        sx={{
          color: theme => {
            if (actionType === 'danger') return theme.palette.red.main
            return theme.palette.light1.main
          }
        }}
        lineHeight={0}
      >
        {icon}
      </Box>
      <Typography
        flex={1}
        variant="body2"
        color={theme => {
          if (actionType === 'danger') return theme.palette.red.main
          return theme.palette.light1.main
        }}
      >
        {text}
      </Typography>
      {renderAdornment()}
    </Stack>
  )
}

export default SettingItem
