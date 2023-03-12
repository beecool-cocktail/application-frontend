import { SWRConfig, Cache } from 'swr'
import fetcher from 'lib/helper/fetcher'
import useErrorHandler from 'lib/application/useErrorHandler'

interface SWRConfigWrapperProps {
  provider?(): Cache
  children: React.ReactNode
}

const SWRConfigWrapper = ({ provider, children }: SWRConfigWrapperProps) => {
  const { handleError } = useErrorHandler()

  return (
    <SWRConfig
      value={{
        onError: (error: unknown) => handleError(error),
        fetcher,
        provider
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRConfigWrapper
