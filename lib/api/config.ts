import axios from 'axios'
import Config from 'lib/types/config'

const getConfig = async (): Promise<Config> => {
  const res = await axios.get<Config>('/api/config')
  return res.data
}

const configApi = { getConfig }

export default configApi
