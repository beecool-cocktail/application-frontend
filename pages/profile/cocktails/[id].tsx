import React from 'react'
import { Button } from '@mui/material'
import useCornerRouter from 'lib/application/useCornerRouter'
import useEditCocktail from 'lib/application/cocktail/useEditCocktail'
import PostEditorSkeleton from 'components/common/postEditor/postEditor/postEditorSkeleton'
import PostEditor from 'components/common/postEditor/postEditor/postEditor'
import TopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'

const CocktailEditPage = () => {
  const router = useCornerRouter()
  const id = Number(router.query.id as string)
  const { cocktailPost, loading, isValidating } = useEditCocktail(id)

  if (loading || isValidating || !cocktailPost)
    return (
      <>
        <TopNavigation
          position="sticky"
          leftSlot={() => <BackButton />}
          rightSlot={() => <Button disabled>預覽</Button>}
        />
        <PostEditorSkeleton />
      </>
    )
  return <PostEditor cocktail={cocktailPost} />
}

export default CocktailEditPage
