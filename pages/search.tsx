import { ReactElement } from 'react'
import Head from 'next/head'
import Layout from 'components/layout/layout'
import CocktailList from 'components/common/cocktailList/cocktailList'

const Search = () => {
  const websiteTitle = '搜尋 - Corner'

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CocktailList useSearch />
    </>
  )
}

Search.getLayout = (page: ReactElement) => <Layout useSearchBar>{page}</Layout>

export default Search
