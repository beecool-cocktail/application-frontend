import Head from 'next/head'
import PostCreate from 'components/common/postEditor/postCreate/postCreate'

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

export default CreatePost
