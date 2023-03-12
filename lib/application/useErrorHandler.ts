import dialogMessages from 'lib/constants/dialogMessages'
import { NetworkIssueError, UnauthorizedError } from 'lib/domain/error'
import useConfirmDialog from './ui/useConfirmDialog'
import useSnackbar from './ui/useSnackbar'
import useAuth from './useAuth'

const useErrorHandler = () => {
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const auth = useAuth()

  const handleNetworkAndDefaultIssue = () => {
    confirmDialog.open({
      ...dialogMessages.networkIssue,
      onConfirm: () => window.location.reload(),
      onCancel: () => confirmDialog.destroy()
    })
  }

  const handleError = (
    error: unknown,
    {
      snackbarMessage,
      useDefaultHandler = true
    }: { snackbarMessage?: string; useDefaultHandler?: boolean } = {}
  ) => {
    console.error(error)
    if (error instanceof Error && error.cause)
      console.error('error cause:', error.cause)
    if (error instanceof NetworkIssueError && useDefaultHandler) {
      handleNetworkAndDefaultIssue()
      return
    }
    if (error instanceof UnauthorizedError) {
      auth.handleTokenExpired()
      return
    }
    if (snackbarMessage) {
      snackbar.error(snackbarMessage)
      return
    }
    if (useDefaultHandler) {
      handleNetworkAndDefaultIssue()
    }
  }

  return {
    handleError
  }
}

export default useErrorHandler
