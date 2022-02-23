import { Fetcher } from 'swr'
import useSWRInfinite from 'swr/infinite'
import axios from 'axios'
import produce from 'immer'
import useConfig from './useConfig'
import type { Cocktail, CocktailList } from 'lib/types/cocktail'
import type { ApiResponse } from 'lib/types/api/responseBase'

const PAGE_SIZE = 5

const fetcher: Fetcher<Cocktail[], [string, number]> = async (url, page) => {
  const res = await axios.get<ApiResponse<CocktailList>>(url, {
    params: { page, page_size: PAGE_SIZE }
  })
  return res.data.data.popular_cocktail_list
}

const useCocktailList = () => {
  const { config, loading: configLoading } = useConfig()
  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite(
    (index, previousPageData: Cocktail[]) => {
      if (!config) return null
      if (previousPageData && !previousPageData.length) return null
      return ['/api/cocktails', index + 1]
    },
    fetcher
  )

  const loadMore = () => setSize(s => s + 1)

  const isLoadingInitialData = (!data && !error) || configLoading
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  let cocktails = data ? data.flatMap(c => c) : []
  if (cocktails && config) {
    cocktails = cocktails.map(cocktail => {
      return produce(cocktail, draft => {
        const url = `${config.staticBaseUrl}/${draft.photo}`
        draft.photos = [url, url]
      })
    })
  }

  return {
    cocktails: cocktails.map(cocktail => {
      return {
        ...cocktail,
        ingredients: [
          { name: '波本或裸麥威士忌', amount: 32, unit: 'L' },
          { name: '方糖', amount: 32, unit: 'L' },
          { name: '安格氏苦精', amount: 32, unit: 'L' }
        ],
        userInfo: {
          user_id: '1',
          user_name: 'Raven',
          email: '',
          photo: '',
          number_of_collection: 0,
          number_of_post: 0,
          is_collection_public: false
        }
      }
    }),
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

export default useCocktailList
