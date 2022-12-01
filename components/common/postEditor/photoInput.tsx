import React from 'react'
import { Box } from '@mui/material'

interface PhotoInputProps {
  onClick(): void
}

const PhotoInput = ({ onClick }: PhotoInputProps) => {
  return (
    <Box
      width={1}
      height={200}
      bgcolor="#ddd"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={50}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      +
    </Box>
  )
}

export default PhotoInput
