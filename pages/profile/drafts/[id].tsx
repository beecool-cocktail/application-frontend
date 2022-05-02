import React from 'react'
import { useRouter } from 'next/router'
import useDraft from 'lib/application/useDraft'
import Spinner from 'components/common/status/spinner'
import PostEditor from 'components/common/postEditor/postEditor'

const DraftById = () => {
  const router = useRouter()
  const id = Number(router.query.id as string)
  const { draft, loading, isValidating } = useDraft(id)

  if (loading || isValidating || !draft) return <Spinner />
  return <PostEditor isDraft draft={draft} />
}

export default DraftById
