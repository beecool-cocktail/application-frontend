import produce from 'immer'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import useCocktailListService from 'lib/services/cocktailListAdapter'
import { CocktailPostItem } from 'lib/domain/cocktail'
import useConfig from '../hooks/useConfig'

const useCocktailList = () => {
  const { config, loading: configLoading } = useConfig()
  const { getList } = useCocktailListService()

  const result = getList()
  let cocktails: CocktailPostItem[] | undefined = result.data
    ? result.data.flatMap(c => c)
    : []
  if (cocktails && config) {
    cocktails = cocktails.map(cocktail =>
      produce(cocktail, draft => {
        const getAbsoluteUrl = (photo: string) =>
          photo ? join(config.staticBaseUrl, photo) : FALLBACK_URL
        draft.photoUrls = draft.photoUrls.map(getAbsoluteUrl)
      })
    )
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
