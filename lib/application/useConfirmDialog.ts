import shallow from 'zustand/shallow'
import useStore from 'lib/services/storeAdapter'

const useConfirmDialog = () => {
  const { isOpen, title, content, onConfirm, onCancel, open, destroy } =
    useStore(
      state => ({
        isOpen: state.confirmDialogOpen,
        title: state.confirmDialogTitle,
        content: state.confirmDialogContent,
        onConfirm: state.confirmDialogOnConfirm,
        onCancel: state.confirmDialogOnCancel,
        open: state.openConfirmDialog,
        destroy: state.destroyConfirmDialog
      }),
      shallow
    )

  return { isOpen, title, content, onConfirm, onCancel, open, destroy }
}

export default useConfirmDialog
