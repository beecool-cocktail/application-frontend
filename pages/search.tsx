import React, { ReactElement } from 'react'
import { Stack } from '@mui/material'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import SearchBar from 'components/common/searchBar'
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
          <CocktailCardList data={cocktails} />
        </Stack>
      )}
    </>
  )
}

Search.getLayout = (page: ReactElement) => (
  <Layout header={<SearchBar />}>{page}</Layout>
)

export default Search
