import React from 'react'
import { useRouter } from 'next/router'
import { CocktailPostDraft } from 'lib/types/cocktail'
import useDraft from 'lib/application/useDraft'
import Spinner from 'components/common/status/spinner'
import PostEditor from 'components/common/postEditor/postEditor'

export interface useDraftProps {
  draft: CocktailPostDraft
  loading: boolean
}

const DraftById = () => {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const { draft, loading, isValidating } = useDraft(id)

  if (loading || isValidating || !draft) return <Spinner />
  return <PostEditor draft={draft} />
}

export default DraftById
