import Head from 'next/head'
import { ReactElement } from 'react'
import useUser from 'lib/application/user/useUser'
import Layout from 'components/layout/layout'
import ProfileDetail from 'components/pages/profile/profileDetail'

const Profile = () => {
  const { user } = useUser()
  const websiteTitle = user
    ? `${user.username} 的收藏 - Corner`
    : '登入 - Corner'

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

export default Profile
