import { useCallback } from 'react'
import BackIcon from 'lib/assets/backReturn.svg'
import BackBgIcon from 'lib/assets/backReturnGrayBgOutlined.svg'
import useCornerRouter from 'lib/application/useCornerRouter'
import IconButton from './iconButton'
import ContainedIconButton from './containedIconButton'

export interface BackButtonProps {
  contained?: boolean
  onClick?(): void
}

const BackButton = ({ contained, onClick }: BackButtonProps) => {
  const router = useCornerRouter()
  const handleClick = useCallback(async () => {
    if (onClick) return onClick()
    router.back()
  }, [onClick, router])

  if (contained) {
    return (
      <ContainedIconButton size={28} onClick={handleClick}>
        <BackBgIcon />
      </ContainedIconButton>
    )
  }

  return (
    <IconButton onClick={handleClick}>
      <BackIcon />
    </IconButton>
  )
}

export default BackButton
