import Head from 'next/head'
import { ReactElement } from 'react'
import Layout from '../../components/layout/layout'
import usePermission from '../../lib/hooks/usePermission'
import ProfileDetail from '../../components/pages/profile/profileDetail'

const Profile = () => {
  const hasPermission = usePermission({ guard: true })
  if (!hasPermission) return null

  return (
    <>
      <Head>
        <title>Whispering Corner</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileDetail />
    </>
  )
}

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Profile
