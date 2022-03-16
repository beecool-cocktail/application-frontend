import React, { ReactElement } from 'react'
import { Box, Stack } from '@mui/material'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import SearchBar from 'components/common/input/searchBar'
import Spinner from 'components/common/status/spinner'
import CocktailCardList from 'components/common/cocktailCardList/cocktailCardList'
import useCocktailList from 'lib/hooks/useCocktailList'

const Search = () => {
  const { cocktails = [], isLoadingInitialData } = useCocktailList()

  return (
    <>
      <Head>
        <title>Whispering Corner Search Page</title>
        <meta name="description" content="Whispering Corner Search Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoadingInitialData ? (
        <Spinner />
      ) : (
        <Stack justifyContent="flex-start" alignItems="stretch">
          <CocktailCardList cocktails={cocktails} />
        </Stack>
      )}
    </>
  )
}

Search.getLayout = (page: ReactElement) => (
  <Layout
    header={
      <Box px="24px">
        <SearchBar placeHolder="找調酒..." />
      </Box>
    }
  >
    {page}
  </Layout>
)

export default Search
