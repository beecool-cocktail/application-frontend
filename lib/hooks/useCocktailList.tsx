import produce from 'immer'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import useCornerSWRInfinite from './useInfiniteCornerSWR'
import useConfig from './useConfig'
import type { Cocktail } from 'lib/types/cocktail'

const useCocktailList = () => {
  const { config, loading: configLoading } = useConfig()
  const result = useCornerSWRInfinite<Cocktail>('/cocktails')

  let cocktails = result.data ? result.data.flatMap(c => c) : []
  if (cocktails && config) {
    cocktails = cocktails.map(cocktail => {
      return produce(cocktail, draft => {
        const getAbsoluteUrl = (photo: string) =>
          join(config.staticBaseUrl, photo ? photo : FALLBACK_URL)
        draft.photos = draft.photos.map(getAbsoluteUrl)
      })
    })
  }

  return {
    ...result,
    cocktails,
    loading: result.isLoadingInitialData || configLoading
  }
}

export default useCocktailList
