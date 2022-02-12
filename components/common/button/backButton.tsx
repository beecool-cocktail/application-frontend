import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export interface BackButtonProps {
  color?: string
  onBack?(): void
}

const BackButton = ({ color = 'black', onBack }: BackButtonProps) => {
  const router = useRouter()
  const handleClick = useCallback(async () => {
    if (onBack) return onBack()
    router.back()
  }, [onBack, router])

  return (
    <IconButton onClick={handleClick}>
      <ArrowBack sx={{ color }} />
    </IconButton>
  )
}

export default BackButton
