import { Typography } from '@mui/material'
import BackButton from 'components/common/button/backButton'
import TrashIcon from 'lib/assets/trashOutlined.svg'
import TrashBgIcon from 'lib/assets/trashGrayBgOutlined.svg'
import IconButton from 'components/common/button/iconButton'
import BasedTopNavigation from 'components/layout/topNavigation'
import ContainedIconButton from 'components/common/button/containedIconButton'
import useCornerRouter from 'lib/application/useCornerRouter'
import { pathname } from 'lib/configs/routes'

interface TopNavigationProps {
  isEditMode: boolean
  isAllSelected: boolean
  onSelectAll(): void
  onDelete(): void
}

const TrashButton = ({
  contained,
  onClick
}: {
  contained?: boolean
  onClick?: () => void
}) => {
  if (contained) {
    return (
      <ContainedIconButton size={28} onClick={onClick}>
        <TrashBgIcon />
      </ContainedIconButton>
    )
  }

  return (
    <IconButton onClick={onClick}>
      <TrashIcon />
    </IconButton>
  )
}

const TopNavigation = ({
  isEditMode,
  isAllSelected,
  onSelectAll,
  onDelete
}: TopNavigationProps) => {
  const router = useCornerRouter()

  return (
    <BasedTopNavigation
      position="sticky"
      title={() => '草稿夾'}
      leftSlot={() => {
        return isEditMode ? (
          <Typography
            variant="body1"
            color={isAllSelected ? 'primary' : 'light2'}
            sx={{ cursor: 'pointer' }}
            onClick={onSelectAll}
          >
            {isAllSelected ? '取消全選' : '全選'}
          </Typography>
        ) : (
          <BackButton onClick={() => router.push(pathname.profile)} />
        )
      }}
      rightSlot={() => (
        <TrashButton contained={isEditMode} onClick={onDelete} />
      )}
    />
  )
}

export default TopNavigation
