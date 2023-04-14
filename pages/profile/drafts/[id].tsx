import React from 'react'
import { useRouter } from 'next/router'
import useDraft from 'lib/application/cocktail/useDraft'
import Loading from 'components/common/status/loading'
import PostCreate from 'components/common/postEditor/postCreate/postCreate'

const DraftById = () => {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const { draft, loading, isValidating } = useDraft(id)

  if (loading || isValidating || !draft) return <Loading />
  return <PostCreate cocktailDraft={draft} />
}

export default DraftById
