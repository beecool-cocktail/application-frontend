import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import NextIcon from 'lib/assets/next.svg'
import AnimationToggleIcon from 'components/common/animationToggleIcon'

interface SettingItemProps {
  actionType?: 'normal' | 'link' | 'switch' | 'danger' | 'primary'
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
            <AnimationToggleIcon
              artboard="Switch Control"
              pressed={switchValue || false}
            />
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
        height: 50,
        px: '10px',
        backgroundColor: theme => theme.palette.dark5.main,
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <Box
        fontSize={24}
        sx={{
          color: theme => {
            switch (actionType) {
              case 'primary':
                return theme.palette.blue.main
              case 'danger':
                return theme.palette.red.main
              default:
                return theme.palette.light1.main
            }
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
          switch (actionType) {
            case 'primary':
              return theme.palette.blue.main
            case 'danger':
              return theme.palette.red.main
            default:
              return theme.palette.light1.main
          }
        }}
      >
        {text}
      </Typography>
      {renderAdornment()}
    </Stack>
  )
}

export default SettingItem
