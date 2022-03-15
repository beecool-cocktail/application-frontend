import { AxiosRequestConfig } from 'axios'
import cornerApi from 'lib/api/cornerApi'
import type Pagination from 'lib/types/pagination'
import type { ApiResponse } from 'lib/types/api/responseBase'

const fetcher = async (
  path: string,
  pagination?: Pagination,
  token?: string
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
