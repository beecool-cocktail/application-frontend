import useSWR from 'swr'
import { join } from 'lib/helper/url'
import useConfig from 'lib/application/useConfig'
import cocktailService from 'lib/services/cocktailAdapter'
import useAuth from '../useAuth'

const useEditCocktail = (id: number) => {
  const { token } = useAuth()
  const { config, loading: configLoading } = useConfig()
  const { data, error, isValidating } = useSWR(
    () => {
      if (!id) return null
      if (!token) return id
      return [id, token]
    },
    cocktailService.getById,
    { revalidateOnFocus: false }
  )

  let cocktailPost = data

  if (cocktailPost && config) {
    cocktailPost = {
      ...cocktailPost,
      photos: cocktailPost.photos.map(p => ({
        ...p,
        path: join(config.staticBaseUrl, p.path)
      }))
    }
  } else {
    cocktailPost = undefined
  }

  return {
    cocktailPost,
    error,
    loading: (!cocktailPost && !error) || configLoading,
    isValidating
  }
}

export default useEditCocktail
