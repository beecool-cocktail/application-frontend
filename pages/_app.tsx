import { ReactElement, ReactNode, useEffect, useRef } from 'react'
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
import TabBar from 'components/layout/tabBar'
import NProgress from 'components/layout/nprogress'
import WholePageSpinner from 'components/layout/wholePageSpinner'
import MainContentContainer from 'components/layout/mainContentContainer'
import theme from 'lib/application/configs/theme'
import useHistory from 'lib/application/hooks/ui/useHistory'
import useCornerRouter from 'lib/application/hooks/useCornerRouter'
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

  const router = useCornerRouter()
  const { setHistory } = useHistory()
  const initialized = useRef(false)

  useEffect(() => {
    if (router.isReady) {
      if (!initialized.current) {
        setHistory([router.asPath])
        initialized.current = true
      }
    }
  }, [router.asPath, router.isReady, setHistory])

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
          <MainContentContainer>
            {getLayout(<Component {...pageProps} />)}
          </MainContentContainer>
          <LoginDialog />
          <ConfirmDialog />
          <Snackbar />
          <WholePageSpinner />
          <TabBar />
        </SWRConfigWrapper>
      </ThemeProvider>
    </>
  )
}

export default App
