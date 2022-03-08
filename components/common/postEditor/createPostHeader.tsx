import React from 'react'
import { Button, Stack, Step, StepLabel, Stepper } from '@mui/material'
import Header from 'components/layout/header'
import BackButton from 'components/common/button/backButton'

interface CreatePostHeaderProps {
  steps: string[]
  activeStep: number
  onBack(): void
  onSaveDraft(): void
}

const CreatePostHeader = ({
  steps,
  activeStep,
  onBack,
  onSaveDraft
}: CreatePostHeaderProps) => {
  return (
    <Stack>
      <Header
        title="發文"
        leftButton={<BackButton onClick={onBack} />}
        rightButton={<Button onClick={onSaveDraft}>存成草稿</Button>}
      />
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label} completed={false}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}

export default CreatePostHeader
