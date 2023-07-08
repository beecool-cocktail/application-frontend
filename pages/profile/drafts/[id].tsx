import React from 'react'
import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import useDraft from 'lib/application/cocktail/useDraft'
import PostCreate from 'components/common/postEditor/postCreate/postCreate'
import PostEditorSkeleton from 'components/common/postEditor/postEditor/postEditorSkeleton'
import BottomButton from 'components/common/button/bottomButton'
import ProgressBar from 'components/common/postEditor/progressBar'
import TopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'

const DraftById = () => {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const { draft, loading, isValidating } = useDraft(id)

  if (loading || isValidating || !draft)
    return (
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
    )
  return <PostCreate cocktailDraft={draft} />
}

export default DraftById
