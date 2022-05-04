import { Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Header from 'components/layout/header'
import BackButton from 'components/common/button/backButton'
import DeleteButton from 'components/common/button/deleteButton'
import DraftList from 'components/pages/draft/draftList'
import useDraftList from 'lib/application/useDraftList'
import Loading from 'components/common/status/loading'

const Drafts = () => {
  const {
    drafts,
    loading,
    isBatchDeleteMode,
    selectedIds,
    toggleDeleteMode,
    select,
    deleteSelected
  } = useDraftList()

  if (loading) return <Loading />

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
          onCheck={select}
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
          onClick={deleteSelected}
        >{`確認刪除(${selectedIds.length})`}</Button>
      )}
    </Stack>
  )
}

export default Drafts
