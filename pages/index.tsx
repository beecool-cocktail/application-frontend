import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Stack, CircularProgress, InputBase, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import SearchBar from '../components/searchBar'
import CocktailCardList from '../components/cocktailCardList/cocktailCardList'
import { Cocktail } from '../types/cocktail'
import mockCocktails from '../mock/mockCocktails'

const Home: NextPage = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const router = useRouter()

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
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar onClick={() => router.push('/search')} />
      {loading ? (
        <Stack justifyContent="center" alignItems="center" sx={{ flex: '1' }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack justifyContent="flex-start" alignItems="stretch">
          <CocktailCardList data={cocktails} />
        </Stack>
      )}
    </Layout>
  )
}

export default Home
