import { Box, Typography } from '@mui/material'
import React from 'react'

export interface ActionButtonProps {
  text: string
  onClick?(e: React.MouseEvent): void
}

const ActionButton = ({ onClick, text }: ActionButtonProps) => {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 48px',
        gap: '8px',
        width: '160px',
        height: '48px',
        background: 'rgba(204, 204, 204, 0.5)',
        borderRadius: '6px'
      }}
      onClick={onClick}
    >
      <Typography
        variant="body1"
        sx={{ color: theme => theme.palette.brandWhite.main }}
      >
        {text}
      </Typography>
    </Box>
  )
}

export default ActionButton
