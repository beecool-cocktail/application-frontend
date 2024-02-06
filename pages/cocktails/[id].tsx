import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Stack } from '@mui/material'
import Post from 'components/common/post/post'
import PostSkeleton from 'components/common/post/postSkeleton'
import useCocktail from 'lib/application/hooks/cocktail/useCocktail'

const CocktailPage: NextPage = () => {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const { cocktail, editable, loading, collect, handleEdit } = useCocktail(id)

  const websiteTitle = cocktail
    ? `${cocktail.title} - Corner`
    : 'Corner - 找到屬於你的一杯酒'

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content="Whispering Corner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        justifyContent="flex-start"
        alignItems="stretch"
        position="relative"
        sx={{ pb: '56px' }}
      >
        {loading || !cocktail ? (
          <PostSkeleton />
        ) : (
          <Post
            cocktailPost={cocktail}
            editable={editable}
            onCollect={collect}
            onEdit={handleEdit}
          />
        )}
      </Stack>
    </>
  )
}

export default CocktailPage
