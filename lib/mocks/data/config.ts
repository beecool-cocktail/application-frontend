import Config from 'lib/application/types/config'

const mockConfig: Config = {
  apiBaseUrl: window.location.origin || '',
  staticBaseUrl: window.location.origin || ''
}

export default mockConfig
