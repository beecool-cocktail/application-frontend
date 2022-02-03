import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { grey } from '@mui/material/colors'

export interface BackButtonProps {
  color?: string
}

const BackButton = ({ color = 'black' }: BackButtonProps) => {
  const router = useRouter()
  const handleClick = useCallback(() => {
    router.back()
  }, [router])

  return (
    <IconButton
      // sx={{ position: 'absolute', left: 1, top: 1 }}
      onClick={handleClick}
    >
      <ArrowBack sx={{ color }} />
    </IconButton>
  )
}

export default BackButton
