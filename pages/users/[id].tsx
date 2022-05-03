import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import ProfileDetail from 'components/pages/profile/profileDetail'
import useCornerRouter from 'lib/application/useCornerRouter'

const UserPage: NextPage = () => {
  const router = useCornerRouter()
  const userId = Number(router.query.id as string)
  return (
    <>
      <Head>
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileDetail userId={userId} />
    </>
  )
}

export default UserPage
