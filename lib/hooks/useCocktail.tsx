import produce from 'immer'
import { join } from 'lib/helper/url'
import useConfig from './useConfig'
import useCornerSWR from './useCornerSWR'
import type { CocktailPost } from 'lib/types/cocktail'

const useCocktail = (id: string | undefined) => {
  const { config, loading: configLoading } = useConfig()
  const { data, error } = useCornerSWR<CocktailPost>(
    id && config ? `/cocktails/${id}` : null
  )

  let cocktail = data
  if (cocktail && config) {
    cocktail = produce(cocktail, draft => {
      draft.photos = draft.photos.map(p => ({
        ...p,
        path: join(config.staticBaseUrl, p.path)
      }))
    })
  } else {
    cocktail = undefined
  }

  return {
    cocktail,
    loading: (!data && !error) || configLoading,
    error
  }
}

export default useCocktail
