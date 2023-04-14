import React from 'react'
import useCornerRouter from 'lib/application/useCornerRouter'
import useEditCocktail from 'lib/application/cocktail/useEditCocktail'
import PostEditorSkeleton from 'components/common/postEditor/postEditor/postEditorSkeleton'
import PostEditor from 'components/common/postEditor/postEditor/postEditor'

const CocktailEditPage = () => {
  const router = useCornerRouter()
  const id = Number(router.query.id as string)
  const { cocktailPost, loading, isValidating } = useEditCocktail(id)

  if (loading || isValidating || !cocktailPost) return <PostEditorSkeleton />
  return <PostEditor cocktail={cocktailPost} />
}

export default CocktailEditPage
