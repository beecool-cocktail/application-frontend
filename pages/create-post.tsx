import Head from 'next/head'
import PostCreate from 'components/common/postEditor/postCreate/postCreate'
// import AuthGuard from 'components/app/authGuard'

const CreatePost = () => {
  const websiteTitle = '新增酒譜 - Corner'

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostCreate />
    </>
  )
}

const CreatePostWithAuthGuard = () => {
  return <CreatePost />
  // return (
  //   <AuthGuard>
  //     <CreatePost />
  //   </AuthGuard>
  // )
}

export default CreatePostWithAuthGuard
