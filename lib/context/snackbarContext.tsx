import React from 'react'

export interface SnackbarContextProps {
  open: boolean
  autoHideDuration: number
  setOpen(open: boolean): void
  setAutoHideDuration(ms: number): void
}

const SnackbarContext = React.createContext<SnackbarContextProps>(
  {} as SnackbarContextProps
)

export default SnackbarContext
