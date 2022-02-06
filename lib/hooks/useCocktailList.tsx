import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import produce from 'immer'
import useConfig from './useConfig'
import type { Cocktail, CocktailList } from 'lib/types/cocktail'
import type { ApiResponse } from 'lib/types/api/responseBase'

const fetcher: Fetcher<Cocktail[], string> = async url => {
  const res = await axios.get<ApiResponse<CocktailList>>(url, {
    params: { page: 1, page_size: 10 }
  })
  return res.data.data.popular_cocktail_list
}

const useCocktailList = () => {
  const { config, loading: configLoading } = useConfig()
  const { data, error } = useSWR(config ? '/api/cocktails' : null, fetcher)

  let cocktails = data
  if (data && config) {
    cocktails = data.map(cocktail => {
      return produce(cocktail, draft => {
        draft.photo = `${config.staticBaseUrl}/${draft.photo}`
      })
    })
  }

  return {
    cocktails,
    loading: (!data && !error) || configLoading,
    error
  }
}

export default useCocktailList
