import Head from 'next/head'
import { ReactElement } from 'react'
import usePermission from 'lib/application/usePermission'
import useUser from 'lib/application/user/useUser'
import Layout from 'components/layout/layout'
import ProfileDetail from 'components/pages/profile/profileDetail'
import AnonymousProfile from 'components/pages/profile/anonymousProfile'

const Profile = () => {
  const hasPermission = usePermission()
  const { user } = useUser()

  const websiteTitle = user
    ? `${user.username} - Corner`
    : 'Corner - 找到屬於你的一杯酒'

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {hasPermission ? <ProfileDetail /> : <AnonymousProfile />}
    </>
  )
}

Profile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default Profile
