import { join } from 'lib/helper/url'
import useConfig from './useConfig'
import useCornerSWR from './useCornerSWR'
import type { CocktailPost } from 'lib/types/cocktail'

const useCocktail = (id: string | undefined) => {
  const { config, loading: configLoading } = useConfig()
  const { data, error } = useCornerSWR<CocktailPost>(
    id && config ? `/cocktails/${id}` : null,
    { auth: false }
  )

  let cocktail = data
  if (cocktail && config) {
    cocktail = {
      ...cocktail,
      photos: cocktail.photos.map(photo => join(config.staticBaseUrl, photo))
    }
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
