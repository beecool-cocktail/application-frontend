import axios, { AxiosError, AxiosResponse } from 'axios'
import ResponseCode from 'lib/application/constants/responseCode'
import {
  HttpStatusError,
  NetworkIssueError,
  RequestSetupError,
  ResponseCodeError,
  UnauthorizedError
} from 'lib/application/types/error'
import { ApiResponse } from 'lib/application/types/responseBase'

const validateStatus = (status: number) => {
  if (status >= 200 && status <= 300) return true
  return false
}

const cornerApi = axios.create({
  baseURL: '/api',
  validateStatus
})

const responseCodeError = (res: AxiosResponse<ApiResponse<unknown>>) => {
  if (res.data.error_code === ResponseCode.SUCCESS) return res
  const { error_code, error_message } = res.data
  const responseCodeError = new ResponseCodeError(
    error_code,
    error_message,
    res.data
  )
  return Promise.reject(responseCodeError)
}

const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status } = error.response
    if (validateStatus(status)) throw error // ResponseCodeError
    if (status === 401) throw new UnauthorizedError(error)
    throw new HttpStatusError(
      error.response.status,
      error.response.statusText,
      error
    )
  } else if (error.request) {
    // The request was made but no response was received
    throw new NetworkIssueError(error)
  }
  // Something happened in setting up the request that triggered an Error
  return Promise.reject(new RequestSetupError(error))
}

cornerApi.interceptors.response.use(responseCodeError, errorInterceptor)

export default cornerApi
