import { ReactElement } from 'react'
import Head from 'next/head'
import { Stack } from '@mui/material'
import Layout from 'components/layout/layout'
import SearchBar from 'components/common/searchBar'
import CocktailCardList from 'components/common/cocktailCardList/cocktailCardList'
import Spinner from 'components/common/status/spinner'
import useCocktailList from 'lib/hooks/useCocktailList'

const Home = () => {
  const { cocktails = [], loading } = useCocktailList()

  return (
    <>
      <Head>
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Spinner />
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
