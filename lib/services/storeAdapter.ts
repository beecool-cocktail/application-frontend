import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { noop } from 'ramda-adjunct'
import { AlertColor } from '@mui/material'

export const initialState = {
  searchBarInput: '',
  loginDialogOpen: false,
  confirmDialogOpen: false,
  confirmDialogTitle: '',
  confirmDialogContent: '',
  confirmDialogOnConfirm: noop,
  confirmDialogOnCancel: noop,
  snackbarOpen: false,
  snackbarDuration: 0,
  snackbarSeverity: 'info' as AlertColor,
  snackbarMessage: ''
}

export interface CornerState {
  searchBarInput: string
  loginDialogOpen: boolean
  confirmDialogOpen: boolean
  confirmDialogTitle: string
  confirmDialogContent: string
  confirmDialogOnConfirm: () => void
  confirmDialogOnCancel: () => void
  snackbarOpen: boolean
  snackbarDuration: number
  snackbarSeverity: AlertColor
  snackbarMessage: string
  setSearchBarInput: (v: string) => void
  setLoginDialogOpen: (v: boolean) => void
  openConfirmDialog: (v: {
    title: string
    content: string
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
  }) => void
  toInitialState: (mergeState?: Partial<typeof initialState>) => void
}

const useStore = create<CornerState>(
  devtools(set => ({
    ...initialState,
    setSearchBarInput: value => set({ searchBarInput: value }),
    setLoginDialogOpen: value => set({ loginDialogOpen: value }),
    openConfirmDialog: ({ title, content, onConfirm, onCancel }) =>
      set({
        confirmDialogOpen: true,
        confirmDialogTitle: title,
        confirmDialogContent: content,
        confirmDialogOnConfirm: onConfirm,
        confirmDialogOnCancel: onCancel
      }),
    destroyConfirmDialog: () => set({ confirmDialogOpen: false }),
    setSnackbarOpen: value => set({ snackbarOpen: value }),
    setSnackbarState: ({ open, severity, duration, message }) =>
      set({
        snackbarOpen: open,
        snackbarSeverity: severity,
        snackbarDuration: duration,
        snackbarMessage: message
      }),
    toInitialState: mergeState => set({ ...initialState, ...mergeState })
  }))
)

export const createStore = () => useStore

export default useStore
