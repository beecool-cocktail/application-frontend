import { Alert, Snackbar as BaseSnackbar } from '@mui/material'
import useSnackbar from 'lib/application/useSnackbar'

const Snackbar = () => {
  const { open, duration, severity, message, close } = useSnackbar()
  return (
    <BaseSnackbar open={open} onClose={close} autoHideDuration={duration}>
      <Alert severity={severity}>{message}</Alert>
    </BaseSnackbar>
  )
}

export default Snackbar
