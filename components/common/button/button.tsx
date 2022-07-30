import { alpha } from '@mui/material'
import { Button as BaseButton, SxProps, Typography } from '@mui/material'

export interface ButtonProps {
  sx?: SxProps
  size?: 'small' | 'large'
  variant?: 'primary' | 'secondary' | 'text' | 'contained' | 'outlined'
  disabled?: boolean
  children?: React.ReactNode
  onClick?(): void
}

const Button = ({
  sx,
  size = 'small',
  variant = 'primary',
  disabled = false,
  children,
  onClick
}: ButtonProps) => {
  const getSize = () => {
    if (size === 'small') return { width: 141, height: 44 }
    if (size === 'large') return { width: 295, height: 44 }
  }
  const getTypographyVariant = () => {
    if (size === 'small') return 'body2'
    if (size === 'large') return 'subtitle2'
  }

  return (
    <BaseButton
      disabled={disabled}
      onClick={onClick}
      disableRipple
      sx={{
        ...getSize(),
        textTransform: 'none',
        color: theme => {
          if (variant !== 'primary') return theme.palette.primary.main
          return theme.palette.light1.main
        },
        opacity: disabled ? 0.4 : 1,
        borderStyle: 'solid',
        borderWidth: variant === 'secondary' ? '1px' : 0,
        backgroundColor: theme => {
          if (variant !== 'primary') return 'transparent'
          return theme.palette.primary.main
        },
        '&.Mui-disabled': {
          color: theme => {
            if (variant !== 'primary') return theme.palette.light3.main
            return theme.palette.light2.main
          },
          backgroundColor: theme => {
            if (variant !== 'primary') return 'transparent'
            return theme.palette.light4.main
          },
          borderColor: theme => theme.palette.light3.lighter,
          opacity: 1
        },
        ':hover': {
          color: theme => {
            if (variant !== 'primary') return theme.palette.primary.lighter
            return theme.palette.light1.main
          },
          backgroundColor: theme => {
            if (variant !== 'primary') return 'transparent'
            return theme.palette.primary.lighter
          },
          borderColor: theme => theme.palette.primary.lighter
        },
        ':active': {
          color: theme => {
            if (variant !== 'primary') return theme.palette.primary.darker
            return theme.palette.light2.main
          },
          backgroundColor: theme => {
            if (variant !== 'primary')
              return alpha(theme.palette.primary.darker || '#000', 0.1)
            return theme.palette.primary.darker
          },
          borderColor: theme => theme.palette.primary.darker
        },
        ...sx
      }}
    >
      <Typography variant={getTypographyVariant()}>{children}</Typography>
    </BaseButton>
  )
}

export default Button
