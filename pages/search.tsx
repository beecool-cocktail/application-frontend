import React, { ReactElement } from 'react'
import { Box } from '@mui/material'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import Spinner from 'components/common/status/spinner'
import NotFound from 'components/common/status/notFound'
import CocktailCardList from 'components/common/cocktailCardList/cocktailCardList'
import useStore from 'lib/services/storeAdapter'
import useCocktailList from 'lib/application/useCocktailList'

const Search = () => {
  const searchBarInput = useStore(state => state.searchBarInput)
  const { cocktails = [], isLoadingInitialData, collect } = useCocktailList()

  return (
    <>
      <Head>
        <title>Whispering Corner Search Page</title>
        <meta name="description" content="Whispering Corner Search Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        px={2}
        alignItems="stretch"
        justifyContent="center"
      >
        {isLoadingInitialData ? (
          <Spinner />
        ) : searchBarInput ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <NotFound />
          </Box>
        ) : (
          <CocktailCardList
            cocktails={cocktails}
            isLoadingInitialData={isLoadingInitialData}
            onCollect={collect}
          />
        )}
      </Box>
    </>
  )
}

Search.getLayout = (page: ReactElement) => <Layout useSearchBar>{page}</Layout>

export default Search
