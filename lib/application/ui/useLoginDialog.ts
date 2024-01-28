import { useShallow } from 'zustand/react/shallow'
import useStore from 'lib/services/storeAdapter'
import useAuth from '../useAuth'

const useLoginDialog = () => {
  const { askUserPermission } = useAuth()
  const { isOpen, loginState, open, close } = useStore(
    useShallow(state => ({
      isOpen: state.loginDialogOpen,
      loginState: state.loginDialogLoginState,
      open: state.openLoginDialog,
      close: state.closeLoginDialog
    }))
  )

  const confirm = () => askUserPermission(loginState ?? undefined)

  return {
    isOpen,
    open,
    close,
    confirm
  }
}

export default useLoginDialog
