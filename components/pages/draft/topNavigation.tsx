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
  canToggleBatchDeleteMode: boolean
  isBatchDeleteMode: boolean
  isAllSelected: boolean
  onSelectAll(): void
  onDelete(): void
}

const TrashButton = ({
  contained,
  disabled,
  onClick
}: {
  contained: boolean
  disabled: boolean
  onClick: () => void
}) => {
  if (contained) {
    return (
      <ContainedIconButton size={28} disabled={disabled} onClick={onClick}>
        <TrashBgIcon />
      </ContainedIconButton>
    )
  }

  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <TrashIcon />
    </IconButton>
  )
}

const TopNavigation = ({
  canToggleBatchDeleteMode,
  isBatchDeleteMode,
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
        return isBatchDeleteMode ? (
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              color: theme =>
                isAllSelected
                  ? theme.palette.primary.main
                  : theme.palette.light1.main
            }}
            onClick={onSelectAll}
          >
            {isAllSelected ? '取消全選' : '全選'}
          </Typography>
        ) : (
          <BackButton onClick={() => router.push(pathname.profile)} />
        )
      }}
      rightSlot={() => (
        <TrashButton
          disabled={!canToggleBatchDeleteMode}
          contained={isBatchDeleteMode}
          onClick={onDelete}
        />
      )}
    />
  )
}

export default TopNavigation
