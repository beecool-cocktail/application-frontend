import { Typography } from '@mui/material'
import BackButton from 'components/common/button/backButton'
import DeleteButton from 'components/common/button/deleteButton'
import BasedTopNavigation from 'components/layout/topNavigation'

interface TopNavigationProps {
  isEditMode: boolean
  isAllSelected: boolean
  onSelectAll(): void
  onDelete(): void
}

const TopNavigation = ({
  isEditMode,
  isAllSelected,
  onSelectAll,
  onDelete
}: TopNavigationProps) => {
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
          <BackButton />
        )
      }}
      rightSlot={() => (
        <DeleteButton isEditMode={isEditMode} onClick={onDelete} />
      )}
    />
  )
}

export default TopNavigation
