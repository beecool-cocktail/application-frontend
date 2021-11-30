import React, { ReactElement, useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import Head from 'next/head'
import Layout from '../components/layout'
import SearchBar from '../components/searchBar'
import { Cocktail } from '../types/cocktail'
import mockCocktails from '../mock/mockCocktails'
import LoadingScreen from '../components/loadingScreen'
import CocktailCardList from '../components/cocktailCardList/cocktailCardList'

const Search = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setCocktails(mockCocktails)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <Layout>
      <Head>
        <title>Whispering Corner Search Page</title>
        <meta name="description" content="Whispering Corner Search Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Stack justifyContent="flex-start" alignItems="stretch">
          <CocktailCardList data={cocktails} />
        </Stack>
      )}
    </Layout>
  )
}

Search.getLayout = (page: ReactElement) => (
  <Layout header={<SearchBar />}>{page}</Layout>
)

export default Search
