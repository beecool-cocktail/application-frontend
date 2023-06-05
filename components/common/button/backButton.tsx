import { useCallback } from 'react'
import { useRouter } from 'next/router'
import BackIcon from 'lib/assets/backReturn.svg'
import BackBgIcon from 'lib/assets/backReturnGrayBgOutlined.svg'
import IconButton from './iconButton'
import ContainedIconButton from './containedIconButton'

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

  if (contained) {
    return (
      <ContainedIconButton onClick={handleClick}>
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
