import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Header from 'components/layout/header'
import BackButton from 'components/common/button/backButton'
import DeleteButton from 'components/common/button/deleteButton'

const Draft = () => {
  const handleSubmit = () => {
    // TODO
  }

  return (
    <Stack alignItems="stretch">
      <Header
        title="草稿夾"
        leftButton={<BackButton />}
        rightButton={<DeleteButton onClick={handleSubmit} />}
      />
      <Box>
        <Image src="/draft.png" alt="draft" width={512} height={392} />
      </Box>
      <Stack alignItems="center" justifyContent="center" mt={12}>
        <Typography variant="h3">快去發文!</Typography>
      </Stack>
    </Stack>
  )
}

export default Draft
