import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import CloseIcon from 'lib/assets/cancelClose.svg'

export interface CloseButtonProps {
  contained?: boolean
  onClick?(): void
}

const CloseButton = ({ contained, onClick }: CloseButtonProps) => {
  const router = useRouter()
  const handleClick = useCallback(async () => {
    if (onClick) return onClick()
    router.back()
  }, [onClick, router])

  return (
    <IconButton
      sx={{
        width: 28,
        height: 28,
        padding: 0,
        backgroundColor: theme => {
          if (contained) return theme.palette.light4.main
        },
        color: '#fff',
        fontSize: 24
      }}
      onClick={handleClick}
    >
      <CloseIcon />
    </IconButton>
  )
}

export default CloseButton
