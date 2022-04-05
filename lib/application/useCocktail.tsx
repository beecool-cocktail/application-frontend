import produce from 'immer'
import { join } from 'lib/helper/url'
import useCocktailService from 'lib/services/cocktailAdapter'
import useConfig from '../hooks/useConfig'

const useCocktail = (id: number | undefined) => {
  const { config, loading: configLoading } = useConfig()
  const { getById } = useCocktailService(id)
  const result = getById()
  const error = result.error
  let cocktail = result.data

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
    loading: (!cocktail && !error) || configLoading,
    error
  }
}

export default useCocktail
