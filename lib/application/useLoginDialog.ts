import shallow from 'zustand/shallow'
import useStore from 'lib/services/storeAdapter'

const useLoginDialog = () => {
  const loginDialog = useStore(
    state => ({
      open: state.loginDialogOpen,
      setOpen: state.setLoginDialogOpen
    }),
    shallow
  )

  return loginDialog
}

export default useLoginDialog
