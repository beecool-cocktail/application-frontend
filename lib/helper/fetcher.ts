import { AxiosRequestConfig } from 'axios'
import cornerApi from 'lib/services/cornerApi'
import type Pagination from 'lib/types/pagination'
import type { ApiResponse } from 'lib/types/responseBase'

const fetcher = async (
  path: string,
  token?: string,
  pagination?: Pagination
) => {
  const config: AxiosRequestConfig = {}
  config.headers = { ...(token && { Authorization: `Bearer ${token}` }) }
  config.params = pagination
    ? { page: pagination.pageIndex, page_size: pagination.pageSize }
    : null
  const res = await cornerApi.get<ApiResponse<never>>(path, config)

  return res.data.data
}

export default fetcher
