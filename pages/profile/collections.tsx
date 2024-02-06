import Head from 'next/head'
import { ReactElement } from 'react'
import useUser from 'lib/application/hooks/user/useUser'
import Layout from 'components/layout/layout'
import ProfileDetail from 'components/pages/profile/profileDetail'
import AuthGuard from 'components/app/authGuard'

const Profile = () => {
  const { user } = useUser()
  const websiteTitle = user ? `${user.username} 的收藏 - Corner` : ' Corner'

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileDetail tab={1} />
    </>
  )
}

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

const ProfileWithAuthGuard = () => (
  <AuthGuard>
    <Profile />
  </AuthGuard>
)

export default ProfileWithAuthGuard
