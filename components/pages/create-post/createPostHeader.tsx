import React from 'react'
import { Stack } from '@mui/material'
import Header from '../../layout/header'
import SubmitButton from '../../common/button/submitButton'
import BackButton from '../../common/button/backButton'

const CreatePostHeader = () => {
  const handleSubmit = () => {
    // TODO
  }

  return (
    <Stack>
      <Header
        title="發文"
        leftButton={<BackButton />}
        rightButton={<SubmitButton onClick={handleSubmit} />}
      />
    </Stack>
  )
}

export default CreatePostHeader
