import { Box, Stack } from '@mui/material'
import BasedTopNavigation, { NAV_HEIGHT } from 'components/layout/topNavigation'
import BackButton from '../button/backButton'
import ShareButton from '../button/shareButton'
import EditButton from '../button/editButton'

interface PostTopNavigationProps {
  title: string
  editable: boolean
  onEdit?(): void
}

const PostTopNavigation = ({
  title,
  editable,
  onEdit
}: PostTopNavigationProps) => {
  const ratio = 3 / 4
  const swiperHeight = window.innerWidth * ratio
  const thresholdHeight = swiperHeight - NAV_HEIGHT

  return (
    <BasedTopNavigation position="fixed" thresholdHeight={thresholdHeight}>
      {concrete => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 1,
            height: 1,
            px: '16px',
            backgroundColor: theme =>
              concrete ? theme.palette.dark3.main : undefined
          }}
        >
          <BackButton contained={!concrete} />
          <Stack direction="row" spacing="12px">
            <ShareButton title={title} contained={!concrete} />
            {editable && <EditButton contained={!concrete} onClick={onEdit} />}
          </Stack>
        </Box>
      )}
    </BasedTopNavigation>
  )
}

export default PostTopNavigation
