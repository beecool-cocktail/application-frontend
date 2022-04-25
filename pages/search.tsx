import React, { ReactElement } from 'react'
import { Box } from '@mui/material'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import NotFound from 'components/common/status/notFound'
import CocktailList from 'components/common/cocktailList/cocktailList'
import useStore from 'lib/services/storeAdapter'

const Search = () => {
  const searchBarInput = useStore(state => state.searchBarInput)

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
        {searchBarInput ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <NotFound />
          </Box>
        ) : (
          <CocktailList />
        )}
      </Box>
    </>
  )
}

Search.getLayout = (page: ReactElement) => <Layout useSearchBar>{page}</Layout>

export default Search
