import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import mockDrafts from 'lib/mock/mockDrafts'
import Header from 'components/layout/header'
import BackButton from 'components/common/button/backButton'
import DeleteButton from 'components/common/button/deleteButton'
import DraftList from 'components/pages/draft/draftList'
// import Spinner from 'components/common/status/spinner'

const useDrafts = () => {
  return { drafts: mockDrafts, loading: false }
}

const Drafts = () => {
  const { drafts } = useDrafts()
  const handleSubmit = () => {
    // TODO
  }

  return (
    <Stack width={1}>
      <Header
        title="草稿夾"
        leftButton={<BackButton />}
        rightButton={<DeleteButton onClick={handleSubmit} />}
      />
      {drafts.length ? (
        <DraftList drafts={drafts} />
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
    </Stack>
  )
}

export default Drafts
