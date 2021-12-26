import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { grey } from '@mui/material/colors'

const BackButton = () => {
  const router = useRouter()
  const handleClick = useCallback(() => {
    router.back()
  }, [router])

  return (
    <IconButton
      sx={{ position: 'absolute', left: 1, top: 1 }}
      onClick={handleClick}
    >
      <ArrowBack sx={{ color: grey[50] }} />
    </IconButton>
  )
}

export default BackButton
