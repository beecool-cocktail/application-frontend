import { Box, Stack, Typography } from '@mui/material'
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
    <BasedTopNavigation position="sticky">
      {() => (
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 1,
            height: 1,
            px: '16px',
            backgroundColor: theme => theme.palette.dark3.main
          }}
        >
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            {isEditMode ? (
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
            )}
          </Box>
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body1" color="light1">
              草稿夾
            </Typography>
          </Box>
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <DeleteButton isEditMode={isEditMode} onClick={onDelete} />
          </Box>
        </Stack>
      )}
    </BasedTopNavigation>
  )
}

export default TopNavigation
