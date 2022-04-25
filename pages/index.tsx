import { ReactElement } from 'react'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import CocktailList from 'components/common/cocktailList/cocktailList'

const Home = () => {
  return (
    <>
      <Head>
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CocktailList />
    </>
  )
}

Home.getLayout = (page: ReactElement) => <Layout useLogo>{page}</Layout>

export default Home
