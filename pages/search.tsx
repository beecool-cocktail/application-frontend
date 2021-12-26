import React, { ReactElement, useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import Head from 'next/head'
import Layout from '../components/layout'
import SearchBar from '../components/searchBar'
import { Cocktail } from '../types/cocktail'
import LoadingScreen from '../components/loadingScreen'
import CocktailCardList from '../components/cocktailCardList/cocktailCardList'
import cocktailApi from '../api/cocktail'

const Search = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true)
      const { popular_cocktail_list } = await cocktailApi.getCocktails()
      setLoading(false)
      setCocktails(popular_cocktail_list)
    }
    fetchCocktails()
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
