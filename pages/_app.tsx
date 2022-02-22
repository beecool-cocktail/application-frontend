import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import SnackbarWrapper from 'components/app/snackbarWrapper'
import ConfirmDialogWrapper from 'components/app/confirmDialogWrapper'
import SWRConfigWrapper from 'components/app/swrConfigWrapper'
import type { AppProps } from 'next/app'
import 'lib/styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <SnackbarWrapper>
      <ConfirmDialogWrapper>
        <SWRConfigWrapper>
          {getLayout(<Component {...pageProps} />)}
        </SWRConfigWrapper>
      </ConfirmDialogWrapper>
    </SnackbarWrapper>
  )
}

export default App
