import { NextPage } from 'next'
import Head from 'next/head'
import useUser from 'lib/application/hooks/user/useUser'
import ProfileDetail from 'components/pages/profile/profileDetail'
import useCornerRouter from 'lib/application/hooks/useCornerRouter'

const UserPage: NextPage = () => {
  const router = useCornerRouter()
  const userId = Number(router.query.id as string)
  const { user } = useUser(userId)

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
      <ProfileDetail userId={userId} tab={0} />
    </>
  )
}

export default UserPage
