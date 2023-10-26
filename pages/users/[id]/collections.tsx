import { NextPage } from 'next'
import Head from 'next/head'
import useUser from 'lib/application/user/useUser'
import ProfileDetail from 'components/pages/profile/profileDetail'
import useCornerRouter from 'lib/application/useCornerRouter'

const UserPage: NextPage = () => {
  const router = useCornerRouter()
  const userId = Number(router.query.id as string)
  const { user } = useUser(userId)

  const websiteTitle = user
    ? `${user.username} 的收藏 - Corner`
    : 'Corner - 找到屬於你的一杯酒'

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileDetail userId={userId} tab={1} />
    </>
  )
}

export default UserPage
