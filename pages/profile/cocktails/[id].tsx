import React from 'react'
import useCornerRouter from 'lib/application/useCornerRouter'
import Loading from 'components/common/status/loading'
import PostEditor from 'components/common/postEditor/postEditor'
import { join } from 'lib/helper/url'
import useConfig from 'lib/application/useConfig'
import useCocktailService from 'lib/services/cocktailAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'

const useEditCocktail = (id: number) => {
  const storage = useLocalStorage()
  const { config, loading: configLoading } = useConfig()
  const { getById } = useCocktailService(id, storage.getToken())

  const getByIdResult = getById()
  let cocktailPost = getByIdResult.data
  const { isValidating, error } = getByIdResult
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
  return <PostEditor draft={cocktailPost} />
}

export default CocktailEditPage
