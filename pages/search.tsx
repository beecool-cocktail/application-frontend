import React, { ReactElement } from 'react'
import { Box } from '@mui/material'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import CocktailList from 'components/common/cocktailList/cocktailList'

const Search = () => {
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
        alignItems="stretch"
        justifyContent="center"
        mt="115px"
      >
        <CocktailList useSearch />
      </Box>
    </>
  )
}

Search.getLayout = (page: ReactElement) => <Layout useSearchBar>{page}</Layout>

export default Search
