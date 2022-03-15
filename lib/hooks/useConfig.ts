import Config from 'lib/types/config'
import useCornerSWR from './useCornerSWR'

const useConfig = () => {
  const { data, error } = useCornerSWR<Config>('/config', { immutable: true })
  return { config: data, loading: !data && !error, error }
}

export default useConfig
