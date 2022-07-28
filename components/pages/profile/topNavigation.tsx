import { Box, Stack } from '@mui/material'
import BasedTopNavigation from 'components/layout/topNavigation'
import SettingIcon from 'lib/assets/setting.svg'
import DraftIcon from 'lib/assets/draft/default.svg'
import { paths } from 'lib/configs/routes'
import useCornerRouter from 'lib/application/useCornerRouter'
import IconButton from 'components/common/button/iconButton'
import BackButton from 'components/common/button/backButton'

interface TopNavigationProps {
  isVisitor: boolean
}

const TopNavigation = ({ isVisitor }: TopNavigationProps) => {
  const router = useCornerRouter()

  return (
    <BasedTopNavigation position="sticky" thresholdHeight={185}>
      {concrete => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isVisitor ? 'flex-start' : 'flex-end',
            width: 1,
            height: 1,
            pl: '16px',
            pr: '8px',
            backgroundColor: theme =>
              concrete ? theme.palette.dark3.main : theme.palette.dark5.main
          }}
        >
          {isVisitor ? (
            <BackButton />
          ) : (
            <Stack direction="row" spacing="12px">
              <IconButton onClick={() => router.push(paths.drafts)}>
                <DraftIcon />
              </IconButton>
              <IconButton onClick={() => router.push(paths.settings)}>
                <SettingIcon />
              </IconButton>
            </Stack>
          )}
        </Box>
      )}
    </BasedTopNavigation>
  )
}

export default TopNavigation
