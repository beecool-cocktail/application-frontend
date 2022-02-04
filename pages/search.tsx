import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import Head from 'next/head'
import produce from 'immer'
import Layout from 'components/layout/layout'
import SearchBar from 'components/common/searchBar'
import { Cocktail } from 'lib/types/cocktail'
import LoadingScreen from 'components/common/loadingScreen'
import CocktailCardList from 'components/common/cocktailCardList/cocktailCardList'
import cocktailApi from 'lib/api/cocktail'
import ConfigContext from 'lib/context/configContext'

const Search = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState(false)
  const config = useContext(ConfigContext)

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

  if (!config) return null

  const cocktailsWithApiBaseUrl = cocktails.map(cocktail =>
    produce(cocktail, draft => {
      draft.photo = `${config.staticBaseUrl}/${draft.photo}`
    })
  )

  return (
    <>
      <Head>
        <title>Whispering Corner Search Page</title>
        <meta name="description" content="Whispering Corner Search Page" />
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

Search.getLayout = (page: ReactElement) => (
  <Layout header={<SearchBar />}>{page}</Layout>
)

export default Search
