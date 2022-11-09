import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Stack } from '@mui/material'
import Post from 'components/common/post/post'
import PostSkeleton from 'components/common/post/postSkeleton'
import useCocktail from 'lib/application/cocktail/useCocktail'

const CocktailPage: NextPage = () => {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const { cocktail, editable, loading, collect, handleEdit } = useCocktail(id)

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      position="relative"
      sx={{ minHeight: '100vh', width: '100%', pb: '56px' }}
    >
      {loading || !cocktail ? (
        <PostSkeleton />
      ) : (
        <Post
          cocktailPost={cocktail}
          editable={editable}
          onCollect={collect}
          onEdit={handleEdit}
        />
      )}
    </Stack>
  )
}

export default CocktailPage
