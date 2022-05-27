import React from 'react'
import { Button as BaseButton, SxProps, Typography } from '@mui/material'

export interface ButtonProps {
  sx?: SxProps
  size?: 'small' | 'medium' | 'large'
  variant?: 'contained' | 'outlined' | 'text'
  disabled?: boolean
  children?: React.ReactNode
  onClick?(): void
}

const Button = ({
  sx,
  size = 'medium',
  variant = 'contained',
  disabled = false,
  children,
  onClick
}: ButtonProps) => {
  const getSize = () => {
    if (size === 'small') return { width: 70, height: 32 }
    if (size === 'medium') return { width: 120, height: 44 }
    if (size === 'large') return { width: 311, height: 52 }
  }
  const getTypographyVariant = () => {
    if (size === 'small') return 'body3'
    if (size === 'medium') return 'body2'
    if (size === 'large') return 'subtitle2'
  }

  return (
    <BaseButton
      disabled={disabled}
      onClick={onClick}
      disableRipple
      sx={{
        ...getSize(),
        color: theme => {
          if (variant !== 'contained') return theme.palette.primary.main
          return 'white'
        },
        opacity: disabled ? 0.4 : 1,
        border: theme => `1px solid ${theme.palette.primary.main}`,
        borderWidth: variant === 'outlined' ? '1px' : 0,
        backgroundColor: theme => {
          if (variant !== 'contained') return 'transparent'
          return theme.palette.primary.main
        },
        '&.Mui-disabled': {
          color: theme => {
            if (variant !== 'contained') return theme.palette.primary.main
            return 'white'
          },
          backgroundColor: theme => {
            if (variant !== 'contained') return 'transparent'
            return theme.palette.primary.main
          }
        },
        ':hover': {
          color: theme => {
            if (variant !== 'contained') return theme.palette.primary.lighter
            return 'white'
          },
          backgroundColor: theme => {
            if (variant !== 'contained') return 'transparent'
            return theme.palette.primary.lighter
          },
          borderColor: theme => theme.palette.primary.lighter
        },
        ':active': {
          color: theme => {
            if (variant !== 'contained') return theme.palette.primary.darker
            return 'white'
          },
          backgroundColor: theme => {
            if (variant !== 'contained') return 'transparent'
            return theme.palette.primary.darker
          },
          borderColor: theme => theme.palette.primary.darker
        },
        ...sx
      }}
    >
      <Typography variant={getTypographyVariant()}>{children}</Typography>
    </BaseButton>
  )
}

export default Button
