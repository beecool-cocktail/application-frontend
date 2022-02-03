import { useState, useEffect, ReactElement } from 'react'
import Head from 'next/head'
import { Stack } from '@mui/material'
import Layout from 'components/layout/layout'
import SearchBar from 'components/common/searchBar'
import CocktailCardList from 'components/common/cocktailCardList/cocktailCardList'
import LoadingScreen from 'components/common/loadingScreen'
import { Cocktail } from 'types/cocktail'
import cocktailApi from 'api/cocktail'

const Home = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        setLoading(true)
        const { popular_cocktail_list } = await cocktailApi.getCocktails()
        setLoading(false)
        setCocktails(popular_cocktail_list)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCocktails()
  }, [])

  return (
    <>
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
    </>
  )
}

Home.getLayout = (page: ReactElement) => (
  <Layout header={<SearchBar />}>{page}</Layout>
)

export default Home
