import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

interface ImageInputProps {
  size?: 'small' | 'large'
  src?: string
}

const ImageInput = ({ size = 'small', src }: ImageInputProps) => {
  return (
    <Box
      position="relative"
      width={1}
      height={size === 'small' ? 100 : 200}
      bgcolor="#ddd"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={size === 'small' ? 40 : 50}
      style={{ cursor: 'pointer' }}
    >
      {src ? <Image src={src} alt="image" layout="fill" /> : '+'}
    </Box>
  )
}

export default ImageInput
