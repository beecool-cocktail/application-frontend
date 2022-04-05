import useSWR from 'swr'
import useLocalStorage from 'lib/services/localStorageAdapter'
import fetcher from 'lib/helper/fetcher'
import defaultCornerConfig from 'lib/constants/cornerConfig'
import type CornerSWROption from 'lib/types/cornerSWROption'

const useCornerSWR = <T>(
  path: string | null,
  cornerConfig: CornerSWROption = defaultCornerConfig
) => {
  const storage = useLocalStorage()
  const getKey = () => {
    if (!path) return null
    if (!cornerConfig.auth) return path
    const token = storage.getToken()
    if (!token) return null
    return [path, null, token]
  }

  const key = getKey()
  const result = useSWR<T>(key, fetcher, {
    ...(cornerConfig.immutable && {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    })
  })
  if (cornerConfig.auth && result.error) storage.removeToken()

  return result
}

export default useCornerSWR
