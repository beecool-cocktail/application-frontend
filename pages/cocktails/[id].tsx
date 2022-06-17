import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Stack } from '@mui/material'
import BackButton from 'components/common/button/backButton'
import Loading from 'components/common/status/loading'
import Post from 'components/common/post/post'
import useCocktail from 'lib/application/cocktail/useCocktail'

const CocktailPage: NextPage = () => {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const { cocktail, loading, collect } = useCocktail(id)

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      position="relative"
      sx={{ minHeight: '100vh', width: '100%' }}
    >
      {loading || !cocktail ? (
        <Loading />
      ) : (
        <Post cocktailPost={cocktail} onCollect={collect} />
      )}
      <Box position="absolute" left={1} top={1} zIndex={1}>
        <BackButton color="white" />
      </Box>
    </Stack>
  )
}

export default CocktailPage
