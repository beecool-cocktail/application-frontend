import Head from 'next/head'
import { Button } from '@mui/material'
import useCornerRouter from 'lib/application/hooks/useCornerRouter'
import useEditCocktail from 'lib/application/hooks/cocktail/useEditCocktail'
import PostEditorSkeleton from 'components/common/postEditor/postEditor/postEditorSkeleton'
import PostEditor from 'components/common/postEditor/postEditor/postEditor'
import TopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import AuthGuard from 'components/app/authGuard'

const CocktailEditPage = () => {
  const router = useCornerRouter()
  const id = Number(router.query.id as string)
  const { cocktailPost, loading, isValidating } = useEditCocktail(id)

  const websiteTitle = `${cocktailPost?.title} 編輯 - Corner`

  if (loading || isValidating || !cocktailPost)
    return (
      <>
        <Head>
          <title>{websiteTitle}</title>
          <meta name="description" content={websiteTitle} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TopNavigation
          position="sticky"
          leftSlot={() => <BackButton />}
          rightSlot={() => <Button disabled>預覽</Button>}
        />
        <PostEditorSkeleton />
      </>
    )

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostEditor cocktail={cocktailPost} />
    </>
  )
}

const CocktailEditPageWithAuthGuard = () => (
  <AuthGuard>
    <CocktailEditPage />
  </AuthGuard>
)

export default CocktailEditPageWithAuthGuard
