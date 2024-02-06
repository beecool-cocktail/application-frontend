import useSWR from 'swr'
import Config from 'lib/application/types/config'
import { join } from 'lib/utils/url'

const useConfig = () => {
  const { data: config, error } = useSWR<Config>('/config', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  const toAbsolutePath = (path: string) => {
    if (!config) return path
    return join(config.staticBaseUrl, path)
  }

  return { config: config, loading: !config && !error, error, toAbsolutePath }
}

export default useConfig
