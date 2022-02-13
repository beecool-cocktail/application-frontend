import { useState, ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { SWRConfig } from 'swr'
import { Alert, Snackbar } from '@mui/material'
import 'lib/styles/globals.css'
import SnackbarContext from 'lib/context/snackbarContext'
import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)
  const [isSnackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarAutoHideDuration, setSnackbarAutoHideDuration] = useState(3000)
  const handleCloseSnackbar = () => setSnackbarOpen(false)

  return (
    <SWRConfig
      value={{
        onError: (error: Error) => {
          console.error(error)
        }
      }}
    >
      <SnackbarContext.Provider
        value={{
          open: isSnackbarOpen,
          setOpen: setSnackbarOpen,
          autoHideDuration: snackbarAutoHideDuration,
          setAutoHideDuration: setSnackbarAutoHideDuration
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </SnackbarContext.Provider>
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={snackbarAutoHideDuration}
      >
        <Alert severity="success">Saved</Alert>
      </Snackbar>
    </SWRConfig>
  )
}

export default App
