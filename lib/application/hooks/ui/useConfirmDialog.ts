import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { noop } from 'ramda-adjunct'

type ConfirmDialogPrimaryButton = 'confirm' | 'cancel'

export interface ConfirmDialogState {
  isOpen: boolean
  title: string
  content: string
  primaryButton: ConfirmDialogPrimaryButton
  onlyConfirm: boolean
  confirmText: string
  cancelText: string
  onConfirm: () => void
  onCancel: () => void
}

export interface ConfirmDialogStore extends ConfirmDialogState {
  open: (v: {
    title: string
    content: string
    confirmText?: string
    cancelText?: string
    primaryButton?: 'confirm' | 'cancel'
    onlyConfirm?: boolean
    onConfirm: () => void
    onCancel: () => void
  }) => void
  destroy: () => void
}

const initialState: ConfirmDialogState = {
  isOpen: false,
  title: '',
  content: '',
  primaryButton: 'confirm',
  onlyConfirm: false,
  confirmText: '確定',
  cancelText: '取消',
  onConfirm: noop,
  onCancel: noop
}

const useConfirmDialog = create<ConfirmDialogStore>()(
  devtools(set => ({
    ...initialState,
    open: ({
      title,
      content,
      confirmText = initialState.confirmText,
      cancelText = initialState.cancelText,
      primaryButton = initialState.primaryButton,
      onlyConfirm = initialState.onlyConfirm,
      onConfirm,
      onCancel
    }) =>
      set({
        isOpen: true,
        title: title,
        content: content,
        confirmText: confirmText,
        cancelText: cancelText,
        primaryButton: primaryButton,
        onlyConfirm: onlyConfirm,
        onConfirm: onConfirm,
        onCancel: onCancel
      }),
    destroy: () => set({ isOpen: false })
  }))
)

export default useConfirmDialog
