import { Avatar as BaseAvatar, Box, Badge } from '@mui/material'
import Image from 'next/image'
import type { AvatarProps as BaseAvatarProps } from '@mui/material'

interface AvatarProps extends BaseAvatarProps {
  userId?: number
  size: number
}

const Avatar = ({
  src,
  alt = 'avatar',
  userId,
  size,
  ...restProps
}: AvatarProps) => {
  if (!src) return null

  const mainContent = (
    <Box sx={{ cursor: restProps.onClick ? 'pointer' : 'normal' }}>
      <BaseAvatar
        {...restProps}
        sx={{ ...restProps.sx, width: size, height: size }}
      >
        <Image src={src} alt={alt} layout="fill" />
      </BaseAvatar>
    </Box>
  )

  if (userId == null) return mainContent

  return (
    <Badge
      color="primary"
      badgeContent={`#${userId}`}
      sx={{
        '& .MuiBadge-badge': {
          right: -12,
          top: 56,
          transform: 'none',
          borderRadius: '20px',
          px: '5px',
          color: theme => theme.palette.light1.main,
          fontSize: theme => theme.typography.body3.fontSize,
          fontWeight: theme => theme.typography.body3.fontWeight,
          lineHeight: theme => theme.typography.body3.lineHeight
        }
      }}
    >
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: theme => `2px solid ${theme.palette.light1.main}`,
          p: '5px'
        }}
      >
        {mainContent}
      </Box>
    </Badge>
  )
}

export default Avatar
