import { IconButton as BaseIconButton } from '@mui/material'
import React from 'react'

export interface IconButtonProps {
  contained?: boolean
  onClick?(e: React.MouseEvent): void
  children: React.ReactNode
  size?: number
  disabled?: boolean
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
        backgroundColor: theme => {
          if (contained) return theme.palette.light4.main
        },
        color: theme =>
          disabled ? theme.palette.light4.main : theme.palette.light1.main,
        fontSize: 24
      }}
      onClick={onClick}
    >
      {children}
    </BaseIconButton>
  )
}

export default IconButton
