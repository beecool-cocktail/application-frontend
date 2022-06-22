import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export interface BackButtonProps {
  color?: string
  onClick?(): void
}

const BackButton = ({ color = 'white', onClick }: BackButtonProps) => {
  const router = useRouter()
  const handleClick = useCallback(async () => {
    if (onClick) return onClick()
    router.back()
  }, [onClick, router])

  return (
    <IconButton
      sx={{
        color: '#fff',
        backgroundColor: theme => theme.palette.light4.main,
        width: 28,
        height: 28,
        padding: 0
      }}
      onClick={handleClick}
    >
      <ArrowBack sx={{ color }} />
    </IconButton>
  )
}

export default BackButton
