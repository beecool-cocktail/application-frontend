import { useCallback } from 'react'
import { useRouter } from 'next/router'
import BackIcon from 'lib/assets/backReturn.svg'
import IconButton from './iconButton'

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
    <IconButton contained={contained} onClick={handleClick}>
      <BackIcon />
    </IconButton>
  )
}

export default BackButton
