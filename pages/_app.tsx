import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'
import '@fontsource/noto-sans-tc/400.css'
import '@fontsource/noto-sans-tc/500.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/800.css'
import SWRConfigWrapper from 'components/app/SWRConfigWrapper'
import LoginDialog from 'components/common/dialog/loginDialog'
import ConfirmDialog from 'components/common/dialog/confirmDialog'
import Snackbar from 'components/common/snackbar/snackbar'
import theme from 'lib/configs/theme'
import type { AppProps } from 'next/app'
import 'lib/styles/globals.css'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../lib/mocks')
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SWRConfigWrapper>
        <>{getLayout(<Component {...pageProps} />)}</>
        <LoginDialog />
        <ConfirmDialog />
        <Snackbar />
      </SWRConfigWrapper>
    </ThemeProvider>
  )
}

export default App
