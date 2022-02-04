import { ReactElement, ReactNode, useState, useEffect } from 'react'
import { NextPage } from 'next'
import ConfigContext from 'lib/context/configContext'
import Config from 'lib/types/config'
import 'lib/styles/globals.css'
import configApi from 'lib/api/config'
import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)
  const [config, setConfig] = useState<Config | null>(null)

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await configApi.getConfig()
      setConfig(config)
    }
    fetchConfig().catch(console.error)
  }, [])

  return (
    <ConfigContext.Provider value={config}>
      {getLayout(<Component {...pageProps} />)}
    </ConfigContext.Provider>
  )
}

export default App
