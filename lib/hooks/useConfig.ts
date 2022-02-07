import { Fetcher } from 'swr'
import useSWRImmutable from 'swr/immutable'
import axios from 'axios'
import Config from 'lib/types/config'

const fetcher: Fetcher<Config, string> = url =>
  axios.get(url).then(res => res.data)

const useConfig = () => {
  const { data, error } = useSWRImmutable('/api/config', fetcher)

  return {
    config: data,
    loading: !data && !error,
    error
  }
}

export default useConfig
