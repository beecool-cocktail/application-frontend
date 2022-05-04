import React, { ReactElement } from 'react'
import { Box, Typography } from '@mui/material'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import NotFound from 'components/common/status/notFound'
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
        alignItems="stretch"
        justifyContent="center"
        mt="115px"
      >
        {searchBarInput ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <NotFound />
          </Box>
        ) : (
          <Typography variant="h1" textAlign="center" sx={{ color: 'white' }}>
            快來搜尋(･8･)
          </Typography>
        )}
      </Box>
    </>
  )
}

Search.getLayout = (page: ReactElement) => <Layout useSearchBar>{page}</Layout>

export default Search
