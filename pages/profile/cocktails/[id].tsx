import React from 'react'
import useSWR from 'swr'
import useCornerRouter from 'lib/application/useCornerRouter'
import Loading from 'components/common/status/loading'
import PostEditor from 'components/common/postEditor/postEditor'
import { join } from 'lib/helper/url'
import useConfig from 'lib/application/useConfig'
import cocktailService from 'lib/services/cocktailAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'

const useEditCocktail = (id: number) => {
  const storage = useLocalStorage()
  const { config, loading: configLoading } = useConfig()
  const { data, error, isValidating } = useSWR(
    () => {
      if (!id) return null
      const token = storage.getToken()
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

const CocktailEditPage = () => {
  const router = useCornerRouter()
  const id = Number(router.query.id as string)
  const { cocktailPost, loading, isValidating } = useEditCocktail(id)

  if (loading || isValidating || !cocktailPost) return <Loading />
  return <PostEditor cocktail={cocktailPost} />
}

export default CocktailEditPage
