import Head from 'next/head'
import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import useDraft from 'lib/application/cocktail/useDraft'
import PostCreate from 'components/common/postEditor/postCreate/postCreate'
import PostEditorSkeleton from 'components/common/postEditor/postEditor/postEditorSkeleton'
import BottomButton from 'components/common/button/bottomButton'
import ProgressBar from 'components/common/postEditor/progressBar'
import TopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import AuthGuard from 'components/app/authGuard'

const DraftById = () => {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const { draft, loading, isValidating } = useDraft(id)

  const getWebsiteTitle = () => {
    if (!draft) return 'Corner - 找到屬於你的一杯酒'
    if (!draft.title) return '未命名 草稿 - Corner'
    return `${draft.title} 草稿 - Corner`
  }

  const renderHead = () => {
    const websiteTitle = getWebsiteTitle()
    return (
      <Head>
        <title>{websiteTitle}</title>
        <meta name="description" content={websiteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    )
  }

  if (loading || isValidating || !draft)
    return (
      <AuthGuard>
        {renderHead()}
        <Stack position="relative" alignItems="stretch" minHeight={1}>
          <Stack
            position="sticky"
            top={0}
            bgcolor={theme => theme.palette.background.default}
            zIndex={1200}
          >
            <TopNavigation
              position="sticky"
              leftSlot={() => <BackButton />}
              rightSlot={() => <Button disabled>存成草稿</Button>}
            />
            <ProgressBar totalStep={3} activeStep={0} />
          </Stack>
          <PostEditorSkeleton />
          <BottomButton position="sticky" disabled>
            下一步
          </BottomButton>
        </Stack>
      </AuthGuard>
    )

  return (
    <>
      {renderHead()}
      <PostCreate cocktailDraft={draft} />
    </>
  )
}

const DraftByIdWithAuthGuard = () => (
  <AuthGuard>
    <DraftById />
  </AuthGuard>
)

export default DraftByIdWithAuthGuard
