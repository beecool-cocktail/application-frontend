import produce from 'immer'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import useCornerSWRInfinite from './useInfiniteCornerSWR'
import useConfig from './useConfig'
import type { Cocktail } from 'lib/types/cocktail'

const useCocktailList = () => {
  const { config, loading: configLoading } = useConfig()
  const result = useCornerSWRInfinite<Cocktail>('/cocktails')

  let cocktails: Cocktail[] | undefined = result.data
    ? result.data.flatMap(c => c)
    : []
  if (cocktails && config) {
    cocktails = cocktails.map(cocktail => {
      return produce(cocktail, draft => {
        const getAbsoluteUrl = (photo: string) =>
          photo ? join(config.staticBaseUrl, photo) : FALLBACK_URL
        draft.photos = draft.photos.map(getAbsoluteUrl)
      })
    })
  } else {
    cocktails = undefined
  }

  return {
    ...result,
    cocktails,
    loading: result.isLoadingInitialData || configLoading
  }
}

export default useCocktailList
