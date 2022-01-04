import React from 'react'
import { Stack, Typography } from '@mui/material'

export interface HeaderProps {
  title: string
  leftButton: React.ReactNode
  rightButton: React.ReactNode
}

const Header = ({ title, leftButton, rightButton }: HeaderProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
    >
      {leftButton}
      <Typography variant="h6" textAlign="center">
        {title}
      </Typography>
      {rightButton}
    </Stack>
  )
}

export default Header
