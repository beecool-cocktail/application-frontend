import { SWRConfig, Cache } from 'swr'
import { AxiosError } from 'axios'
import useSnackbar from 'lib/application/ui/useSnackbar'
import fetcher from 'lib/helper/fetcher'
import useLocalStorage from 'lib/services/localStorageAdapter'

interface SWRConfigWrapperProps {
  provider?(): Cache
  children: React.ReactNode
}

const SWRConfigWrapper = ({ provider, children }: SWRConfigWrapperProps) => {
  const snackbar = useSnackbar()
  const storage = useLocalStorage()

  const handleError = (error: AxiosError) => {
    console.error(error)

    const statusCode = error.response?.status
    if (statusCode === 401) {
      snackbar.error('token expired, logged out.')
      storage.removeToken()
    } else {
      snackbar.error(error.message)
    }
  }

  return (
    <SWRConfig value={{ onError: handleError, fetcher, provider }}>
      {children}
    </SWRConfig>
  )
}

export default SWRConfigWrapper
