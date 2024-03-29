import { AxiosRequestConfig } from 'axios'
import cornerApi from 'lib/services/api'
import { CommonFetchService } from 'lib/application/ports'
import type Pagination from 'lib/application/types/pagination'
import type { ApiResponse } from 'lib/services/responseBase'

const fetch = async (path: string, token?: string, pagination?: Pagination) => {
  const config: AxiosRequestConfig = {}
  config.headers = { ...(token && { Authorization: `Bearer ${token}` }) }
  config.params = pagination
    ? { page: pagination.pageIndex, page_size: pagination.pageSize }
    : null
  const res = await cornerApi.get<ApiResponse<unknown>>(path, config)

  return res.data.data
}

const CommonFetchService: CommonFetchService = { fetch }

export default CommonFetchService
