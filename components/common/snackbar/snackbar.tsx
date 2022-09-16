import {
  Box,
  Snackbar as BaseSnackbar,
  Slide,
  Typography,
  SlideProps
} from '@mui/material'
import useSnackbar from 'lib/application/ui/useSnackbar'
import UndoCountDown from './undoCountDown'

const mx = 24

const TransitionDown = (props: SlideProps) => {
  return <Slide {...props} direction="down" />
}

const Snackbar = () => {
  const { open, duration, message, close, onUndo } = useSnackbar()

  const handleUndo = () => {
    close()
    onUndo?.()
  }

  const handleTouchMove = () => close()

  return (
    <BaseSnackbar
      open={open}
      message={message}
      TransitionComponent={TransitionDown}
      TransitionProps={{ onTouchMove: handleTouchMove }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={duration}
      onClose={close}
      sx={{
        width: `calc(100% - ${mx * 2}px)`,
        maxWidth: 785,
        top: '8px !important',
        m: 'auto'
      }}
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
          width: 1,
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
        {onUndo && duration && (
          <UndoCountDown onUndo={handleUndo} duration={duration} />
        )}
      </Box>
    </BaseSnackbar>
  )
}

export default Snackbar
