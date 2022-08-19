import { Stack, Typography } from '@mui/material'
import BasedTopNavigation from 'components/layout/topNavigation'
import IconButton from 'components/common/button/iconButton'
import BackButton from 'components/common/button/backButton'
import ConfirmIcon from 'lib/assets/confirm.svg'

const EditUsername = () => {
  const handleConfirm = () => {
    // TODO
  }

  return (
    <div>
      <BasedTopNavigation position="sticky" thresholdHeight={185}>
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
            <BackButton />
            <Typography variant="body1" color="light1">
              更改名稱
            </Typography>
            <IconButton onClick={handleConfirm}>
              <ConfirmIcon />
            </IconButton>
          </Stack>
        )}
      </BasedTopNavigation>
    </div>
  )
}

export default EditUsername
