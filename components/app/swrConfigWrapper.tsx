import { useContext } from 'react'
import { SWRConfig } from 'swr'
import SnackbarContext from 'lib/context/snackbarContext'

const SWRConfigWrapper = ({ children }: { children: React.ReactNode }) => {
  const { api: snackbarApi } = useContext(SnackbarContext)

  const handleError = (error: Error) => {
    snackbarApi.error({ message: error.message })
    console.error(error)
  }

  return <SWRConfig value={{ onError: handleError }}>{children}</SWRConfig>
}

export default SWRConfigWrapper
