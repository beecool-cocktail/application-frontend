import { ReactElement } from 'react'
import Head from 'next/head'
import useSearchBarInner from 'lib/application/hooks/ui/useSearchBarInner'
import Layout from 'components/layout/layout'
import CocktailList from 'components/common/cocktailList/cocktailList'
import useCocktailSearchListStore from 'lib/application/hooks/cocktail/useCocktailSearchListStore'

const Search = () => {
  const { input } = useSearchBarInner()
  const cocktailListStore = useCocktailSearchListStore()

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
      <CocktailList useSearch cocktailListStore={cocktailListStore} />
    </>
  )
}

Search.getLayout = (page: ReactElement) => <Layout useSearchBar>{page}</Layout>

export default Search
