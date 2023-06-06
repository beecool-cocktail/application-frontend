import { Box } from '@mui/system'
import React from 'react'

export interface IconButtonProps {
  children: React.ReactNode
  disabled?: boolean
  active?: boolean
  onClick?(e: React.MouseEvent): void
}

const size = 24
const outerSize = 28

const IconButton = ({
  children,
  onClick,
  disabled,
  active
}: IconButtonProps) => {
  return (
    <Box
      component="button"
      disabled={disabled}
      sx={{
        position: 'relative',
        cursor: disabled ? 'default' : 'pointer',
        width: size,
        height: size,
        bgcolor: 'transparent',
        color: theme => {
          if (disabled) return theme.palette.light4.main
          if (active) return theme.palette.primary.main
          return theme.palette.light2.main
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: (size - outerSize) / 2,
          left: (size - outerSize) / 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          width: outerSize,
          height: outerSize,
          padding: 0,
          lineHeight: 0,
          fontSize: size,
          '&:hover': {
            bgcolor: theme => !disabled && theme.palette.dark6.main,
            boxShadow: !disabled
              ? 'box-shadow: 0px 1.5px 2.5px rgba(13, 13, 13, 0.2)'
              : undefined
          },
          '&:active': {
            bgcolor: theme => !disabled && theme.palette.light4.main,
            boxShadow: !disabled
              ? 'box-shadow: 0px 1.5px 2.5px rgba(13, 13, 13, 0.2)'
              : undefined
          }
        }}
        onClick={e => !disabled && onClick?.(e)}
      >
        {children}
      </Box>
    </Box>
  )
}

export default IconButton
