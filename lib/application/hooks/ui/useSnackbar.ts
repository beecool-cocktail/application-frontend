import { AlertColor } from '@mui/material'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { DEFAULT_CONFIG } from 'lib/application/configs/snackbar'

export interface SnackbarState {
  open: boolean
  duration: number | null
  severity: AlertColor
  message: string
  onClick?: () => void
  onUndo?: () => void
}

export interface SnackbarStore extends SnackbarState {
  close: () => void
  info: (message: string, duration?: number) => void
  success: (
    message: string,
    duration?: number,
    onClick?: () => void,
    onUndo?: () => void
  ) => void
  warning: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
}

const initialState: SnackbarState = {
  open: false,
  duration: 0,
  severity: 'info' as AlertColor,
  message: '',
  onUndo: undefined
}

const useSnackbar = create<SnackbarStore>()(
  devtools<SnackbarStore>(set => {
    return {
      ...initialState,
      close: () => set(initialState),
      info: (message: string, duration?: number) => {
        set({
          open: true,
          severity: 'info',
          duration: duration || DEFAULT_CONFIG.duration,
          message: message || 'info'
        })
      },
      success: (
        message: string,
        duration?: number,
        onClick?: () => void,
        onUndo?: () => void
      ) => {
        set({
          open: true,
          severity: 'success',
          duration: duration || DEFAULT_CONFIG.duration,
          message: message || 'success',
          onClick,
          onUndo
        })
      },
      warning: (message: string, duration?: number) => {
        set({
          open: true,
          severity: 'warning',
          duration: duration || DEFAULT_CONFIG.duration,
          message: message || 'success'
        })
      },
      error: (message: string, duration?: number) => {
        set({
          open: true,
          severity: 'error',
          duration: duration || DEFAULT_CONFIG.duration,
          message: message || 'failed'
        })
      }
    }
  })
)

export default useSnackbar
