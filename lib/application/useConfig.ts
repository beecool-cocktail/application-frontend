import useSWR from 'swr'
import Config from 'lib/types/config'

const useConfig = () => {
  const { data, error } = useSWR<Config>('/config', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return { config: data, loading: !data && !error, error }
}

export default useConfig
