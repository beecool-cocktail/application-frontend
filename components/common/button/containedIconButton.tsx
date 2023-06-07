import { Box } from '@mui/system'
import React from 'react'

export interface IconButtonProps {
  size?: number
  disabled?: boolean
  children: React.ReactNode
  onClick?(e: React.MouseEvent): void
}

const ContainedIconButton = ({
  size = 24,
  disabled,
  children,
  onClick
}: IconButtonProps) => {
  return (
    <Box
      component="button"
      disabled={disabled}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: disabled ? 'default' : 'pointer',
        width: size,
        height: size,
        padding: 0,
        lineHeight: 0,
        bgcolor: theme => {
          return theme.palette.light4.main
        },
        color: theme => {
          if (disabled) return theme.palette.light3.main
          return theme.palette.light1.main
        },
        fontSize: size,
        '&:hover': {
          bgcolor: theme => !disabled && theme.palette.light3.main,
          boxShadow: !disabled
            ? 'box-shadow: 0px 1.5px 2.5px rgba(13, 13, 13, 0.2)'
            : undefined
        },
        '&:active': {
          bgcolor: theme => !disabled && theme.palette.dark6.main,
          color: theme => !disabled && theme.palette.light3.main,
          boxShadow: !disabled
            ? 'box-shadow: 0px 1.5px 2.5px rgba(13, 13, 13, 0.2)'
            : undefined
        }
      }}
      onClick={e => !disabled && onClick?.(e)}
    >
      {children}
    </Box>
  )
}

export default ContainedIconButton
