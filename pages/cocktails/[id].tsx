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
            description:
              'this is side car this is side car this is side carcar this is side carcar this is side carcar this is side carcar this is side car',
            photos: cocktail.photos,
            ingredients: [
              { name: '波本或裸麥威士忌', amount: 32, unit: 'L' },
              { name: '方糖', amount: 32, unit: 'L' },
              { name: '安格氏苦精', amount: 32, unit: 'L' }
            ],
            steps: [
              { description: 'step 1' },
              { description: 'step 2' },
              { description: 'step 3' },
              { description: 'step 4' },
              { description: 'step 5' }
            ]
          }}
        />
      )}
      <Box position="absolute" left={1} top={1} zIndex={1}>
        <BackButton color="white" />
      </Box>
    </Stack>
  )
}

export default CocktailPage
