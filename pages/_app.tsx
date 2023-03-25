import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
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
import NProgress from 'components/layout/nprogress'
import WholePageSpinner from 'components/layout/wholePageSpinner'
import MaxWidthContainer from 'components/layout/maxWidthContainer'
import theme from 'lib/configs/theme'
import { MAX_WIDTH } from 'lib/constants/layout'
import type { AppProps } from 'next/app'
import 'lib/styles/globals.css'
import 'nprogress/nprogress.css'
// import 'lib/mocks'

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
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NProgress />
        <SWRConfigWrapper>
          <MaxWidthContainer maxWidth={MAX_WIDTH}>
            {getLayout(<Component {...pageProps} />)}
          </MaxWidthContainer>
          <LoginDialog />
          <ConfirmDialog />
          <Snackbar />
          <WholePageSpinner />
        </SWRConfigWrapper>
      </ThemeProvider>
    </>
  )
}

export default App
