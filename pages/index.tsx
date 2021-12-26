import { useState, useEffect, ReactElement } from 'react'
import Head from 'next/head'
import { Stack } from '@mui/material'
import Layout from '../components/layout'
import SearchBar from '../components/searchBar'
import CocktailCardList from '../components/cocktailCardList/cocktailCardList'
import LoadingScreen from '../components/loadingScreen'
import { Cocktail } from '../types/cocktail'
import cocktailApi from '../api/cocktail'

const Home = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

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
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
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

Home.getLayout = (page: ReactElement) => (
  <Layout header={<SearchBar />}>{page}</Layout>
)

export default Home
