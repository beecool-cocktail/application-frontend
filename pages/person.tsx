import Head from 'next/head'
import { ReactElement } from 'react'
import { Button } from '@mui/material'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import usePermission from '../hooks/usePermission'
import useAuth from '../hooks/useAuth'

const Person = () => {
  const hasPermission = usePermission({ guard: true })
  const { logout } = useAuth()
  if (!hasPermission) return null

  return (
    <Layout>
      <Head>
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>Person Page</main>
      <Button onClick={logout}>Logout</Button>
    </Layout>
  )
}

Person.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Person
