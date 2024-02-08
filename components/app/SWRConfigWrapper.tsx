import { SWRConfig, Cache } from 'swr'
import commonFetchService from 'lib/services/commonFetchAdapter'
import useErrorHandler from 'lib/application/hooks/useErrorHandler'

interface SWRConfigWrapperProps {
  provider?(): Cache
  children: React.ReactNode
}

const SWRConfigWrapper = ({ provider, children }: SWRConfigWrapperProps) => {
  const { handleError } = useErrorHandler()

  return (
    <SWRConfig
      value={{
        onError: error => handleError(error),
        fetcher: commonFetchService.fetch,
        provider
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRConfigWrapper
