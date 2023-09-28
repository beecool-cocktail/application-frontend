import { ReactElement } from 'react'
import Head from 'next/head'
import useSearchBar from 'lib/application/ui/useSearchBar'
import Layout from 'components/layout/layout'
import CocktailList from 'components/common/cocktailList/cocktailList'

const Search = () => {
  const { input } = useSearchBar()

  const getWebsiteTitle = () => {
    if (input) return `${input} - Corner`
    return '搜尋 - Corner'
  }

  const websiteTitle = getWebsiteTitle()

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
