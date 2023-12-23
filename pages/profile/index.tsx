import { ReactElement } from 'react'
import Head from 'next/head'
import useUser from 'lib/application/user/useUser'
import Layout from 'components/layout/layout'
import ProfileDetail from 'components/pages/profile/profileDetail'
import AnonymousProfile from 'components/pages/profile/anonymousProfile'
import useAuth from 'lib/application/useAuth'

const Profile = () => {
  const { user } = useUser()
  const { isAuthenticated, isTokenReady } = useAuth()

  const getWebsiteTitle = () => {
    if (!isAuthenticated) return '登入 - Corner'
    if (user) return `${user.username} - Corner`
    return 'Corner'
  }

  const websiteTitle = getWebsiteTitle()

  if (!isTokenReady) return null

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isAuthenticated ? <ProfileDetail tab={0} /> : <AnonymousProfile />}
    </>
  )
}

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Profile
