import { IconButton as BaseIconButton } from '@mui/material'
import React from 'react'

export interface BackButtonProps {
  contained?: boolean
  onClick?(e: React.MouseEvent): void
  children: React.ReactNode
  size?: number
}

const IconButton = ({
  children,
  contained,
  size = 28,
  onClick
}: BackButtonProps) => {
  return (
    <BaseIconButton
      sx={{
        width: size,
        height: size,
        padding: 0,
        backgroundColor: theme => {
          if (contained) return theme.palette.light4.main
        },
        color: '#fff',
        fontSize: 24
      }}
      onClick={onClick}
    >
      {children}
    </BaseIconButton>
  )
}

export default IconButton
