import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Stack } from '@mui/material'
import BackButton from 'components/common/button/backButton'
import Spinner from 'components/common/status/spinner'
import Post from 'components/common/post/post'
import useCocktail from 'lib/hooks/useCocktail'

const CocktailPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { cocktail, loading } = useCocktail(id)

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      position="relative"
      sx={{ minHeight: '100vh', width: '100%' }}
    >
      {loading || !cocktail ? (
        <Spinner />
      ) : (
        <Post
          cocktailPost={{
            title: cocktail.title,
            description: cocktail.title,
            photos: ['/cocktail.jpg'],
            ingredients: [],
            steps: []
          }}
        />
      )}
      <Box position="absolute" left={1} top={1} zIndex={1}>
        <BackButton />
      </Box>
    </Stack>
  )
}

export default CocktailPage
