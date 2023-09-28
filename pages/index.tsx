import { ReactElement } from 'react'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import CocktailList from 'components/common/cocktailList/cocktailList'

const Home = () => {
  const websiteTitle = 'Corner - 找到屬於你的一杯酒'

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CocktailList />
    </>
  )
}

Home.getLayout = (page: ReactElement) => <Layout useLogo>{page}</Layout>

export default Home
