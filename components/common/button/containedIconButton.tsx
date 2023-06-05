import { Box } from '@mui/system'
import React from 'react'

export interface IconButtonProps {
  children: React.ReactNode
  disabled?: boolean
  onClick?(e: React.MouseEvent): void
}

const size = 24

const ContainedIconButton = ({
  children,
  onClick,
  disabled
}: IconButtonProps) => {
  return (
    <Box
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
          bgcolor: theme => theme.palette.light3.main,
          boxShadow: 'box-shadow: 0px 1.5px 2.5px rgba(13, 13, 13, 0.2)'
        },
        '&:active': {
          bgcolor: theme => theme.palette.dark6.main,
          color: theme => theme.palette.light3.main,
          boxShadow: 'box-shadow: 0px 1.5px 2.5px rgba(13, 13, 13, 0.2)'
        }
      }}
      onClick={e => !disabled && onClick?.(e)}
    >
      {children}
    </Box>
  )
}

export default ContainedIconButton
