import { IconButton as BaseIconButton } from '@mui/material'
import React from 'react'

export interface IconButtonProps {
  children: React.ReactNode
  contained?: boolean
  size?: number
  fontSize?: number
  disabled?: boolean
  onClick?(e: React.MouseEvent): void
}

const IconButton = ({
  children,
  contained,
  size = 28,
  onClick,
  disabled
}: IconButtonProps) => {
  return (
    <BaseIconButton
      disabled={disabled}
      sx={{
        width: size,
        height: size,
        padding: 0,
        lineHeight: 0,
        backgroundColor: theme => {
          if (contained) return theme.palette.light4.main
        },
        color: theme => theme.palette.light1.main,
        fontSize: size,
        '&:disabled': {
          color: theme => theme.palette.light4.main
        }
      }}
      onClick={onClick}
    >
      {children}
    </BaseIconButton>
  )
}

export default IconButton
