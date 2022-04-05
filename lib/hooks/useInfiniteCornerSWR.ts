import useSWRInfinite from 'swr/infinite'
import { last } from 'ramda'
import useLocalStorage from 'lib/services/localStorageAdapter'
import { PAGE_SIZE } from 'lib/constants/pagination'
import fetcher from 'lib/helper/fetcher'
import defaultCornerConfig from 'lib/constants/cornerConfig'
import { InfiniteFetchResponse } from 'lib/domain/cocktail'
import type Pagination from 'lib/types/pagination'
import type CornerSWROption from 'lib/types/cornerSWROption'
import type { PaginationResponse } from 'lib/types/api/responseBase'

const useCornerSWRInfinite = <T>(
  path: string | null,
  cornerConfig: CornerSWROption = defaultCornerConfig,
  pageSize: number = PAGE_SIZE
): InfiniteFetchResponse<T> => {
  const storage = useLocalStorage()
  const {
    data: pageData,
    error,
    size,
    setSize,
    isValidating
  } = useSWRInfinite<PaginationResponse<T>>(
    (index, previousPageData: PaginationResponse<T>) => {
      if (!path) return null
      if (previousPageData && !previousPageData.popular_cocktail_list.length)
        return null
      const pagination: Pagination = {
        pageIndex: index + 1,
        pageSize: pageSize
      }
      const key = [path, pagination]
      if (cornerConfig.auth) {
        const token = storage.getToken()
        if (!token) return null
        key.push(token)
      }
      return key
    },
    fetcher
  )

  const getTotal = () => {
    if (!pageData) return 0
    const lastPage = last(pageData)
    if (!lastPage) return 0
    return lastPage.total
  }

  const total = getTotal()
  const data = pageData ? pageData.map(p => p.popular_cocktail_list) : []

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize)
  const isRefreshing = isValidating && data && data.length === size
  const loadMore = () => setSize(s => s + 1)

  return {
    data,
    total,
    error,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    loadMore
  }
}

export default useCornerSWRInfinite
