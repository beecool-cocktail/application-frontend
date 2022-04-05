import React from 'react'
import { useRouter } from 'next/router'
import Spinner from 'components/common/status/spinner'
import PostEditor from 'components/common/postEditor/postEditor'
import { CocktailPostDraft } from 'lib/types/cocktail'
import useDraft from 'lib/application/useDraft'

export interface useDraftProps {
  draft: CocktailPostDraft
  loading: boolean
}

const DraftById = () => {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const { draft, loading } = useDraft(id)

  if (loading || !draft) return <Spinner />
  return <PostEditor draft={draft} />
}

export default DraftById
