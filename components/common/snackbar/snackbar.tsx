import {
  Box,
  CircularProgress,
  Snackbar as BaseSnackbar,
  Typography
} from '@mui/material'
import useSnackbar from 'lib/application/useSnackbar'
import Button from 'components/common/button/button'

const Snackbar = () => {
  const { open, duration, message, close, onUndo } = useSnackbar()

  return (
    <BaseSnackbar
      open={open}
      message={message}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={duration}
      onClose={close}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme => theme.palette.dark6.main,
          boxShadow:
            '0px 4px 15px rgba(0, 0, 0, 0.65), 0px 0px 10px rgba(0, 0, 0, 0.25)',
          borderRadius: '8px',
          height: 48,
          minWidth: 327,
          px: '24px'
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme => theme.palette.light1.main }}
        >
          {message}
        </Typography>
        {onUndo && (
          <Box>
            <CircularProgress />
            <Button size="small" variant="text" onClick={onUndo}>
              Undo
            </Button>
          </Box>
        )}
      </Box>
    </BaseSnackbar>
  )
}

export default Snackbar
