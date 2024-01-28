import { ReactElement } from 'react'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import CocktailList from 'components/common/cocktailList/cocktailList'
import useCocktailListStore from 'lib/services/useCocktailListStore'

const Home = () => {
  const websiteTitle = 'Corner - 找到屬於你的一杯酒'
  const cocktailListStore = useCocktailListStore()

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
      </Head>
      <CocktailList cocktailListStore={cocktailListStore} />
    </>
  )
}

Home.getLayout = (page: ReactElement) => <Layout useLogo>{page}</Layout>

export default Home
