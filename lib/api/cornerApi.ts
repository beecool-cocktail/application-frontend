import axios, { AxiosResponse } from 'axios'
import { ApiResponse } from 'lib/types/api/responseBase'

const cornerApi = axios.create({
  baseURL: '/api',
  validateStatus: status => {
    if (status >= 200 && status <= 300) return true
    return false
  }
})

const errorCodeInterceptor = (res: AxiosResponse<ApiResponse<never>>) => {
  if (res.data.error_code === '00000') return res
  console.error(res.data.error_code)
  const error = new Error(res.data.error_message)
  return Promise.reject(error)
}

cornerApi.interceptors.response.use(errorCodeInterceptor)

export default cornerApi
