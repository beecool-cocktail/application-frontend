import { SWRConfig } from 'swr'
import useSnackbar from 'lib/application/useSnackbar'

const SWRConfigWrapper = ({ children }: { children: React.ReactNode }) => {
  const snackbar = useSnackbar()

  const handleError = (error: Error) => {
    snackbar.error(error.message)
    console.error(error)
  }

  return <SWRConfig value={{ onError: handleError }}>{children}</SWRConfig>
}

export default SWRConfigWrapper
