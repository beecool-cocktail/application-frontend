import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { noop } from 'ramda-adjunct'
import { AlertColor } from '@mui/material'
import { LoginState } from 'lib/domain/auth'

type ConfirmDialogPrimaryButton = 'confirm' | 'cancel'

export interface CornerState {
  history: string[]
  loading: boolean
  collectAfterLogin: boolean
  searchBarInput: string
  loginDialogOpen: boolean
  loginDialogLoginState: LoginState | null
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
  snackbarOnClick?: () => void
  snackbarOnUndo?: () => void
}

export const initialState: CornerState = {
  history: [],
  loading: false,
  collectAfterLogin: false,
  searchBarInput: '',
  loginDialogOpen: false,
  loginDialogLoginState: null,
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
  setHistory: (v: string[]) => void
  setLoading: (v: boolean) => void
  setSearchBarInput: (v: string) => void
  setCollectAfterLogin: (v: boolean) => void
  openLoginDialog: (v?: LoginState) => void
  closeLoginDialog: () => void
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
    onClick?: () => void
    onUndo?: () => void
  }) => void
  toInitialState: (mergeState?: Partial<CornerState>) => void
}

const useStore = create<CornerStore>()(
  devtools(set => ({
    ...initialState,
    setHistory: value => set({ history: value }),
    setLoading: value => set({ loading: value }),
    setCollectAfterLogin: value => set({ collectAfterLogin: value }),
    setSearchBarInput: value => set({ searchBarInput: value }),
    openLoginDialog: value =>
      set({
        loginDialogOpen: true,
        loginDialogLoginState: value ?? null
      }),
    closeLoginDialog: () => set({ loginDialogOpen: false }),
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
    setSnackbarState: ({
      open,
      severity,
      duration,
      message,
      onClick,
      onUndo
    }) =>
      set({
        snackbarOpen: open,
        snackbarSeverity: severity,
        snackbarDuration: duration,
        snackbarMessage: message,
        snackbarOnClick: onClick,
        snackbarOnUndo: onUndo
      }),
    toInitialState: mergeState => set({ ...initialState, ...mergeState })
  }))
)

export const createStore = () => useStore

export default useStore
