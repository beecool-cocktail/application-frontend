import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import SearchBar from '../components/searchBar'
import Banner from '../components/banner'
import CocktailList from '../components/cocktailList/cocktailList'

type Cocktail = {
  id: number
  name: string
  tags: string[]
  imageUrl: string
}

const mockCocktails: Cocktail[] = [
  {
    id: 1,
    name: 'Sidecar',
    tags: ['酸甜', '冬季'],
    imageUrl: '/cocktail.jpg'
  },
  {
    id: 2,
    name: 'Old Fashion',
    tags: ['酸甜', '冬季'],
    imageUrl: '/cocktail.jpg'
  },
  {
    id: 3,
    name: 'Old Fashion',
    tags: ['酸甜', '冬季'],
    imageUrl: '/cocktail.jpg'
  },
  {
    id: 4,
    name: 'Old Fashion',
    tags: ['酸甜', '冬季'],
    imageUrl: '/cocktail.jpg'
  },
  {
    id: 5,
    name: 'Old Fashion',
    tags: ['酸甜', '冬季'],
    imageUrl: '/cocktail.jpg'
  },
  {
    id: 6,
    name: 'Old Fashion',
    tags: ['酸甜', '冬季'],
    imageUrl: '/cocktail.jpg'
  },
  {
    id: 7,
    name: 'Old Fashion',
    tags: ['酸甜', '冬季'],
    imageUrl: '/cocktail.jpg'
  },
  {
    id: 8,
    name: 'Old Fashion',
    tags: ['酸甜', '冬季'],
    imageUrl: '/cocktail.jpg'
  },
  {
    id: 9,
    name: 'Old Fashion',
    tags: ['酸甜', '冬季'],
    imageUrl: '/cocktail.jpg'
  }
]

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
        <SearchBar />
        <Banner />
        <CocktailList cocktails={cocktails} loading={loading} />
      </main>
    </Layout>
  )
}

export default Home