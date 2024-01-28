import { useShallow } from 'zustand/react/shallow'
import useStore from 'lib/services/storeAdapter'

const useConfirmDialog = () => {
  const {
    isOpen,
    title,
    content,
    confirmText,
    cancelText,
    primaryButton,
    onlyConfirm,
    onConfirm,
    onCancel,
    open,
    destroy
  } = useStore(
    useShallow(state => ({
      isOpen: state.confirmDialogOpen,
      title: state.confirmDialogTitle,
      content: state.confirmDialogContent,
      confirmText: state.confirmDialogConfirmText,
      cancelText: state.confirmDialogCancelText,
      primaryButton: state.confirmDialogPrimaryButton,
      onlyConfirm: state.confirmDialogOnlyConfirm,
      onConfirm: state.confirmDialogOnConfirm,
      onCancel: state.confirmDialogOnCancel,
      open: state.openConfirmDialog,
      destroy: state.destroyConfirmDialog
    }))
  )

  return {
    isOpen,
    title,
    content,
    confirmText,
    cancelText,
    primaryButton,
    onlyConfirm,
    onConfirm,
    onCancel,
    open,
    destroy
  }
}

export default useConfirmDialog
