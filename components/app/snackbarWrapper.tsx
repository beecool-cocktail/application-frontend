import React, { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { SnackbarState, SnackbarApiProps } from 'lib/types/snackbar'
import SnackbarContext from 'lib/context/snackbarContext'
import { DEFAULT_CONFIG } from 'lib/configs/snackbar'

const SnackbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    duration: 0,
    severity: 'info',
    message: ''
  })
  const handleClose = () =>
    setSnackbarState(state => ({ ...state, open: false }))

  const snackbarApi = {
    info: (props: SnackbarApiProps) => {
      setSnackbarState({
        open: true,
        severity: 'info',
        duration: props.duration || DEFAULT_CONFIG.duration,
        message: props.message || 'info'
      })
    },
    success: (props: SnackbarApiProps) => {
      setSnackbarState({
        open: true,
        severity: 'success',
        duration: props.duration || DEFAULT_CONFIG.duration,
        message: props.message || 'success'
      })
    },
    warning: (props: SnackbarApiProps) => {
      setSnackbarState({
        open: true,
        severity: 'warning',
        duration: props.duration || DEFAULT_CONFIG.duration,
        message: props.message || 'success'
      })
    },
    error: (props: SnackbarApiProps) => {
      setSnackbarState({
        open: true,
        severity: 'error',
        duration: props.duration || DEFAULT_CONFIG.duration,
        message: props.message || 'failed'
      })
    }
  }

  return (
    <SnackbarContext.Provider
      value={{ state: snackbarState, api: snackbarApi }}
    >
      {children}
      <Snackbar
        open={snackbarState.open}
        onClose={handleClose}
        autoHideDuration={snackbarState.duration}
      >
        <Alert severity={snackbarState.severity}>{snackbarState.message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export default SnackbarWrapper
