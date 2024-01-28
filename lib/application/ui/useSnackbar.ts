import { useShallow } from 'zustand/react/shallow'
import { DEFAULT_CONFIG } from 'lib/configs/snackbar'
import useStore from 'lib/services/storeAdapter'

const useSnackbar = () => {
  const {
    open,
    severity,
    duration,
    message,
    setOpen,
    setState,
    onClick,
    onUndo
  } = useStore(
    useShallow(state => ({
      open: state.snackbarOpen,
      duration: state.snackbarDuration,
      severity: state.snackbarSeverity,
      message: state.snackbarMessage,
      setOpen: state.setSnackbarOpen,
      setState: state.setSnackbarState,
      onClick: state.snackbarOnClick,
      onUndo: state.snackbarOnUndo
    }))
  )
  const close = () => setOpen(false)

  const info = (message: string, duration?: number) => {
    setState({
      open: true,
      severity: 'info',
      duration: duration || DEFAULT_CONFIG.duration,
      message: message || 'info'
    })
  }
  const success = (
    message: string,
    duration?: number,
    onClick?: () => void,
    onUndo?: () => void
  ) => {
    setState({
      open: true,
      severity: 'success',
      duration: duration || DEFAULT_CONFIG.duration,
      message: message || 'success',
      onClick,
      onUndo
    })
  }
  const warning = (message: string, duration?: number) => {
    setState({
      open: true,
      severity: 'warning',
      duration: duration || DEFAULT_CONFIG.duration,
      message: message || 'success'
    })
  }
  const error = (message: string, duration?: number) => {
    setState({
      open: true,
      severity: 'error',
      duration: duration || DEFAULT_CONFIG.duration,
      message: message || 'failed'
    })
  }

  return {
    open,
    severity,
    duration,
    message,
    info,
    success,
    warning,
    error,
    close,
    onClick,
    onUndo
  }
}

export default useSnackbar
