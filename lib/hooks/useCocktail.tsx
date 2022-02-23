import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import useConfig from './useConfig'
import type { ApiResponse } from 'lib/types/api/responseBase'
import type { Cocktail, CocktailList } from 'lib/types/cocktail'

const fetcher: Fetcher<Cocktail, string> = async url => {
  const res = await axios.get<ApiResponse<CocktailList>>(url)
  return res.data.data.popular_cocktail_list[0]
}

const useCocktail = (id: string | undefined) => {
  const { config, loading: configLoading } = useConfig()
  const { data, error } = useSWR(
    id && config ? ['/api/cocktails', id] : null,
    fetcher
  )

  let cocktail = data
  if (data && config) {
    const url = `${config.staticBaseUrl}/${cocktail?.photo}`
    cocktail = { ...data, photos: [url, url] }
  }

  return {
    cocktail,
    loading: (!data && !error) || configLoading,
    error
  }
}

export default useCocktail
