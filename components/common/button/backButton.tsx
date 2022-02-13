import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export interface BackButtonProps {
  color?: string
  onClick?(): void
}

const BackButton = ({ color = 'black', onClick }: BackButtonProps) => {
  const router = useRouter()
  const handleClick = useCallback(async () => {
    if (onClick) return onClick()
    router.back()
  }, [onClick, router])

  return (
    <IconButton onClick={handleClick}>
      <ArrowBack sx={{ color }} />
    </IconButton>
  )
}

export default BackButton
