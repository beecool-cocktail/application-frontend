import { Box } from '@mui/material'
import Image from 'next/image'

export interface AvatarProps {
  src: string
  alt?: string
  size: number
}

const Avatar = ({ src, alt = 'avatar', size }: AvatarProps) => {
  return (
    <Box width={size} height={size} borderRadius="50%" overflow="hidden">
      <Image src={src} alt={alt} width={size} height={size} />
    </Box>
  )
}

export default Avatar
