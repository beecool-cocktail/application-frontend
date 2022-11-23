import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import BackIcon from 'lib/assets/backReturn.svg'

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
        width: 28,
        height: 28,
        padding: 0,
        backgroundColor: theme => {
          if (contained) return theme.palette.light4.main
        },
        color: theme => theme.palette.light1.main,
        fontSize: 24
      }}
      onClick={handleClick}
    >
      <BackIcon />
    </IconButton>
  )
}

export default BackButton
