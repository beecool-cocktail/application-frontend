import React from 'react'
import { Button, Stack, Step, StepLabel, Stepper } from '@mui/material'
import Header from 'components/layout/header'
import BackButton from 'components/common/button/backButton'

interface CreatePostHeaderProps {
  isDraft: boolean
  isEdit: boolean
  steps: string[]
  activeStep: number
  savable: boolean
  onBack(): void
  onSaveDraft(): void
}

const PostEditorHeader = ({
  isDraft,
  isEdit,
  steps,
  activeStep,
  savable,
  onBack,
  onSaveDraft
}: CreatePostHeaderProps) => {
  const renderTitle = () => {
    if (isDraft || !isEdit) return '發文'
    return '編輯貼文'
  }
  const renderRightButton = () => {
    if (!isDraft) return null
    return (
      <Button disabled={!savable} onClick={onSaveDraft}>
        存成草稿
      </Button>
    )
  }

  return (
    <Stack>
      <Header
        title={renderTitle()}
        leftButton={<BackButton onClick={onBack} />}
        rightButton={renderRightButton()}
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

export default PostEditorHeader
