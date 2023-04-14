import Head from 'next/head'
import { ReactElement } from 'react'
import usePermission from 'lib/application/usePermission'
import Layout from 'components/layout/layout'
import ProfileDetail from 'components/pages/profile/profileDetail'
import AnonymousProfile from 'components/pages/profile/anonymousProfile'

const Profile = () => {
  const hasPermission = usePermission()

  return (
    <>
      <Head>
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {hasPermission ? <ProfileDetail /> : <AnonymousProfile />}
    </>
  )
}

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Profile
