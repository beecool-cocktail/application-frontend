import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { noop } from 'ramda-adjunct'
import { AlertColor } from '@mui/material'

type ConfirmDialogPrimaryButton = 'confirm' | 'cancel'

export interface CornerState {
  searchBarInput: string
  loginDialogOpen: boolean
  confirmDialogOpen: boolean
  confirmDialogTitle: string
  confirmDialogContent: string
  confirmDialogPrimaryButton: ConfirmDialogPrimaryButton
  confirmDialogOnlyConfirm: boolean
  confirmDialogConfirmText: string
  confirmDialogCancelText: string
  confirmDialogOnConfirm: () => void
  confirmDialogOnCancel: () => void
  snackbarOpen: boolean
  snackbarDuration: number | null
  snackbarSeverity: AlertColor
  snackbarMessage: string
  snackbarOnUndo?: () => void
}

export const initialState: CornerState = {
  searchBarInput: '',
  loginDialogOpen: false,
  confirmDialogOpen: false,
  confirmDialogTitle: '',
  confirmDialogContent: '',
  confirmDialogPrimaryButton: 'confirm',
  confirmDialogOnlyConfirm: false,
  confirmDialogConfirmText: '確定',
  confirmDialogCancelText: '取消',
  confirmDialogOnConfirm: noop,
  confirmDialogOnCancel: noop,
  snackbarOpen: false,
  snackbarDuration: 0,
  snackbarSeverity: 'info' as AlertColor,
  snackbarMessage: '',
  snackbarOnUndo: undefined
}

export interface CornerStore extends CornerState {
  setSearchBarInput: (v: string) => void
  setLoginDialogOpen: (v: boolean) => void
  openConfirmDialog: (v: {
    title: string
    content: string
    confirmText?: string
    cancelText?: string
    primaryButton?: 'confirm' | 'cancel'
    onlyConfirm?: boolean
    onConfirm: () => void
    onCancel: () => void
  }) => void
  destroyConfirmDialog: () => void
  setSnackbarOpen: (v: boolean) => void
  setSnackbarState: (v: {
    open: boolean
    severity: AlertColor
    duration: number
    message: string
    onUndo?: () => void
  }) => void
  toInitialState: (mergeState?: Partial<CornerState>) => void
}

const useStore = create<CornerStore>(
  devtools(set => ({
    ...initialState,
    setSearchBarInput: value => set({ searchBarInput: value }),
    setLoginDialogOpen: value => set({ loginDialogOpen: value }),
    openConfirmDialog: ({
      title,
      content,
      confirmText = initialState.confirmDialogConfirmText,
      cancelText = initialState.confirmDialogCancelText,
      primaryButton = initialState.confirmDialogPrimaryButton,
      onlyConfirm = initialState.confirmDialogOnlyConfirm,
      onConfirm,
      onCancel
    }) =>
      set({
        confirmDialogOpen: true,
        confirmDialogTitle: title,
        confirmDialogContent: content,
        confirmDialogConfirmText: confirmText,
        confirmDialogCancelText: cancelText,
        confirmDialogPrimaryButton: primaryButton,
        confirmDialogOnlyConfirm: onlyConfirm,
        confirmDialogOnConfirm: onConfirm,
        confirmDialogOnCancel: onCancel
      }),
    destroyConfirmDialog: () => set({ confirmDialogOpen: false }),
    setSnackbarOpen: value => set({ snackbarOpen: value }),
    setSnackbarState: ({ open, severity, duration, message, onUndo }) =>
      set({
        snackbarOpen: open,
        snackbarSeverity: severity,
        snackbarDuration: duration,
        snackbarMessage: message,
        snackbarOnUndo: onUndo
      }),
    toInitialState: mergeState => set({ ...initialState, ...mergeState })
  }))
)

export const createStore = () => useStore

export default useStore
