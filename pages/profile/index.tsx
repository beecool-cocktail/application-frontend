import { ReactElement } from 'react'
import Head from 'next/head'
import useUser from 'lib/application/user/useUser'
import Layout from 'components/layout/layout'
import ProfileDetail from 'components/pages/profile/profileDetail'
import AnonymousProfile from 'components/pages/profile/anonymousProfile'

const Profile = () => {
  const { user, loading } = useUser()
  const websiteTitle = user ? `${user.username} - Corner` : '登入 - Corner'

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user || loading ? <ProfileDetail tab={0} /> : <AnonymousProfile />}
    </>
  )
}

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Profile
