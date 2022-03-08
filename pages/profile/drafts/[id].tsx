import React from 'react'
import { useRouter } from 'next/router'
// import useSWR from 'swr'
import Spinner from 'components/common/status/spinner'
import PostEditor from 'components/common/postEditor/postEditor'
import { CocktailPostDraft } from 'lib/types/cocktail'
import mockDrafts from 'lib/mock/mockDrafts'

export interface useDraftProps {
  draft: CocktailPostDraft
  loading: boolean
}

const useDraft = (id: string): useDraftProps => {
  return { draft: mockDrafts[Number(id)], loading: false }
}

const DraftById = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { draft, loading } = useDraft(id)

  if (loading || !draft) return <Spinner />
  return <PostEditor draft={draft} />
}

export default DraftById
