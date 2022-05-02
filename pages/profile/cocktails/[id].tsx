import React from 'react'
import useCornerRouter from 'lib/application/useCornerRouter'
import Spinner from 'components/common/status/spinner'
import PostEditor from 'components/common/postEditor/postEditor'
import { join } from 'lib/helper/url'
import useConfig from 'lib/application/useConfig'
import useCocktailService from 'lib/services/cocktailAdapter'

const useEditCocktail = (id: number) => {
  const { config, loading: configLoading } = useConfig()
  const { getById } = useCocktailService(id)

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

  if (loading || isValidating || !cocktailPost) return <Spinner />
  return <PostEditor draft={cocktailPost} />
}

export default CocktailEditPage
