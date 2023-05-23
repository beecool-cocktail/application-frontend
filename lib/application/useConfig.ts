import env from '@beam-australia/react-env'
import { join } from 'lib/helper/url'

const useConfig = () => {
  const config = {
    apiBaseUrl: env('API_BASE_URL'),
    staticBaseUrl: env('IMAGE_DOMAIN')
  }

  const toAbsolutePath = (path: string) => {
    if (!config) return path
    return join(config.staticBaseUrl, path)
  }

  return { config, loading: false, error: false, toAbsolutePath }
}

export default useConfig
