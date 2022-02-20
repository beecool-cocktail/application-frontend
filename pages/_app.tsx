import { useState, ReactElement, ReactNode, useContext } from 'react'
import { NextPage } from 'next'
import { SWRConfig } from 'swr'
import { Alert, Snackbar } from '@mui/material'
import 'lib/styles/globals.css'
import SnackbarContext from 'lib/context/snackbarContext'
import { SnackbarState, SnackbarApiProps } from 'lib/types/snackbar'
import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const DEFAULT_CONFIG = {
  duration: 3000
}

const SnackbarContextWrapper = ({
  children
}: {
  children: React.ReactNode
}) => {
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
        message: props.message || 'sucess'
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

const SWRConfigWrapper = ({ children }: { children: React.ReactNode }) => {
  const { api: snackbarApi } = useContext(SnackbarContext)

  const handleError = (error: Error) => {
    snackbarApi.error({ message: error.message })
    console.error(error)
  }

  return <SWRConfig value={{ onError: handleError }}>{children}</SWRConfig>
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <SnackbarContextWrapper>
      <SWRConfigWrapper>
        {getLayout(<Component {...pageProps} />)}
      </SWRConfigWrapper>
    </SnackbarContextWrapper>
  )
}

export default App
