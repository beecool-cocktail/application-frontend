import { useEffect } from 'react'
import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import SearchBar from '../components/searchBar'
import styles from '../styles/Home.module.css'

const Search: NextPage = () => {
  useEffect(() => {
    // TODO
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
        <Typography>Search Page</Typography>
      </main>
    </Layout>
  )
}

export default Search
