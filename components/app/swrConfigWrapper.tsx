import { SWRConfig } from 'swr'
import { AxiosError } from 'axios'
import useSnackbar from 'lib/application/useSnackbar'
import fetcher from 'lib/helper/fetcher'
import useLocalStorage from 'lib/services/localStorageAdapter'

const SWRConfigWrapper = ({ children }: { children: React.ReactNode }) => {
  const snackbar = useSnackbar()
  const storage = useLocalStorage()

  const handleError = (error: AxiosError) => {
    const statusCode = error.response?.status
    if (statusCode === 401) {
      snackbar.error('token expired, logged out.')
      storage.removeToken()
    } else {
      snackbar.error(error.message)
    }
  }

  return (
    <SWRConfig value={{ onError: handleError, fetcher }}>{children}</SWRConfig>
  )
}

export default SWRConfigWrapper
