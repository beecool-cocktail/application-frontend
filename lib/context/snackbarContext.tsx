import React from 'react'
import { SnackbarState, SnackbarApi } from 'lib/types/snackbar'

export interface SnackbarContextProps {
  api: SnackbarApi
  state: SnackbarState
}

const SnackbarContext = React.createContext<SnackbarContextProps>(
  {} as SnackbarContextProps
)

export default SnackbarContext
