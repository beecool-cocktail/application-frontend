import { useState, useEffect, ReactElement, useContext } from 'react'
import Head from 'next/head'
import { Stack } from '@mui/material'
import produce from 'immer'
import Layout from 'components/layout/layout'
import SearchBar from 'components/common/searchBar'
import CocktailCardList from 'components/common/cocktailCardList/cocktailCardList'
import LoadingScreen from 'components/common/loadingScreen'
import { Cocktail } from 'lib/types/cocktail'
import cocktailApi from 'lib/api/cocktail'
import ConfigContext from 'lib/context/configContext'

const Home = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const config = useContext(ConfigContext)

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true)
      const { popular_cocktail_list } = await cocktailApi.getCocktails()
      setLoading(false)
      setCocktails(popular_cocktail_list)
    }
    fetchCocktails().catch(console.error)
  }, [])

  if (!config) return null

  const cocktailsWithApiBaseUrl = cocktails.map(cocktail =>
    produce(cocktail, draft => {
      draft.photo = `${config.staticBaseUrl}/${draft.photo}`
    })
  )

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
          <CocktailCardList data={cocktailsWithApiBaseUrl} />
        </Stack>
      )}
    </>
  )
}

Home.getLayout = (page: ReactElement) => (
  <Layout header={<SearchBar />}>{page}</Layout>
)

export default Home
