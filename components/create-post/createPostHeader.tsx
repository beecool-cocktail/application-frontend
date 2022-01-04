import React from 'react'
import { Stack } from '@mui/material'
import Header from '../layout/header'
import SubmitButton from '../button/submitButton'
import BackButton from '../button/backButton'

const CreatePostHeader = () => {
  const handleSubmit = () => {
    console.log('submit')
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
