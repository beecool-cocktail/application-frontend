import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { Cocktail } from '../types/cocktail'
import mockCocktails from '../mock/mockCocktails'
import CocktailCardList from '../components/cocktailCardList/cocktailCardList'
// import SearchBar from '../components/searchBar'
// import Banner from '../components/banner'

const Home: NextPage = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setCocktails(mockCocktails)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <Layout>
      <Head>
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CocktailCardList data={cocktails} />
        {/* <SearchBar />
        <Banner /> */}
        {/* <CocktailList cocktails={cocktails} loading={loading} /> */}
      </main>
    </Layout>
  )
}

export default Home
