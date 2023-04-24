import { Avatar as BaseAvatar, Box, Badge } from '@mui/material'
import Image from 'next/image'
import { getUserIdDisplay } from 'lib/domain/user'
import type { AvatarProps as BaseAvatarProps } from '@mui/material'

interface AvatarProps extends BaseAvatarProps {
  size: number
  userId?: number
  outlined?: boolean
}

const Avatar = ({
  src,
  alt = 'avatar',
  outlined = false,
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

  const withBadge = (child: React.ReactNode) => {
    if (!userId) throw new Error('userId undefined')
    const userIdDisplay = getUserIdDisplay(userId)
    return (
      <Badge
        color="primary"
        badgeContent={userIdDisplay}
        sx={theme => ({
          '& .MuiBadge-badge': {
            right: -12,
            top: 56,
            transform: 'none',
            height: '18px',
            borderRadius: '20px',
            px: '5px',
            color: theme.palette.light1.main,
            ...theme.typography.body3
          }
        })}
      >
        {child}
      </Badge>
    )
  }

  const withOutlined = (child: React.ReactNode) => {
    return (
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
        {child}
      </Box>
    )
  }

  let content: React.ReactNode = mainContent
  if (outlined) content = withOutlined(content)
  if (userId) content = withBadge(content)
  return content
}

export default Avatar
