import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import BackIcon from 'lib/assets/backReturn/topNav.svg'

export interface BackButtonProps {
  contained?: boolean
  onClick?(): void
}

const BackButton = ({ contained, onClick }: BackButtonProps) => {
  const router = useRouter()
  const handleClick = useCallback(async () => {
    if (onClick) return onClick()
    router.back()
  }, [onClick, router])

  return (
    <IconButton
      sx={{
        width: 30,
        height: 30,
        padding: 0,
        backgroundColor: theme => {
          if (contained) return theme.palette.light4.main
        },
        color: '#fff',
        fontSize: 24
      }}
      onClick={handleClick}
    >
      <BackIcon />
    </IconButton>
  )
}

export default BackButton
