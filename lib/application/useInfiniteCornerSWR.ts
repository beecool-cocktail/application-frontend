import useSWRInfinite from 'swr/infinite'
import { last } from 'ramda'
import { PAGE_SIZE } from 'lib/constants/pagination'
import fetcher from 'lib/helper/fetcher'
import { InfiniteFetchResponse } from 'lib/domain/cocktail'
import type Pagination from 'lib/types/pagination'
import type { PaginationResponse } from 'lib/types/responseBase'

const useCornerSWRInfinite = <T>(
  path: string | null,
  token: string | null,
  pageSize: number = PAGE_SIZE
): InfiniteFetchResponse<T> => {
  const {
    data: pageData,
    error,
    size,
    setSize,
    isValidating,
    mutate
  } = useSWRInfinite<PaginationResponse<T>>(
    (index, previousPageData: PaginationResponse<T>) => {
      if (!path) return null
      if (previousPageData && !previousPageData.popular_cocktail_list.length)
        return null
      const pagination: Pagination = {
        pageIndex: index + 1,
        pageSize: pageSize
      }
      return [path, token, pagination]
    },
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false }
  )

  const getTotal = () => {
    if (!pageData) return 0
    const lastPage = last(pageData)
    if (!lastPage) return 0
    return lastPage.total
  }

  const total = getTotal()
  const data = pageData ? pageData.map(p => p.popular_cocktail_list) : []

  const isLoadingInitialData = !pageData && !error
  const isLoadingMore =
    (isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === 'undefined')) &&
    !error
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
    loadMore,
    mutate
  }
}

export default useCornerSWRInfinite
