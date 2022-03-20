import { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Header from 'components/layout/header'
import BackButton from 'components/common/button/backButton'
import DeleteButton from 'components/common/button/deleteButton'
import DraftList from 'components/pages/draft/draftList'
import useDraftList from 'lib/hooks/useDraftList'
import Spinner from 'components/common/status/spinner'

const Drafts = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isBatchDeleteMode, setBatchDeleteMode] = useState(false)
  const { drafts, setDrafts, loading } = useDraftList()

  const toggleDeleteMode = () => {
    setBatchDeleteMode(mode => !mode)
    setSelectedIds([])
  }
  const handleConfirmDelete = () => {
    setDrafts(drafts =>
      drafts.filter(draft => !selectedIds.includes(draft.cocktail_id))
    )
    setBatchDeleteMode(false)
    setSelectedIds([])
  }
  const handleCheck = (targetId: number, checked: boolean) => {
    if (!checked)
      return setSelectedIds(ids => ids.filter(id => id !== targetId))
    if (selectedIds.includes(targetId)) return
    setSelectedIds(ids => [...ids, targetId])
  }

  if (loading) return <Spinner />

  return (
    <Stack width={1}>
      <Header
        title="草稿夾"
        leftButton={<BackButton />}
        rightButton={
          <DeleteButton
            batchMode={isBatchDeleteMode}
            onClick={toggleDeleteMode}
          />
        }
      />
      {drafts?.length ? (
        <DraftList
          drafts={drafts}
          isDeleteMode={isBatchDeleteMode}
          selectedIds={selectedIds}
          onCheck={handleCheck}
        />
      ) : (
        <Stack
          width={1}
          padding={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3">快去發文!</Typography>
          <Image src="/draft.png" alt="draft" width={512} height={392} />
        </Stack>
      )}
      {isBatchDeleteMode && (
        <Button
          onClick={handleConfirmDelete}
        >{`確認刪除(${selectedIds.length})`}</Button>
      )}
    </Stack>
  )
}

export default Drafts
