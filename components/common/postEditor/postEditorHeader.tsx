import React from 'react'
import { Button, Stack, Step, StepLabel, Stepper } from '@mui/material'
import Header from 'components/layout/header'
import BackButton from 'components/common/button/backButton'
import ProgressBar from './progressBar'

interface CreatePostHeaderProps {
  isEditPost: boolean
  steps: string[]
  activeStep: number
  savable: boolean
  onBack(): void
  onSaveDraft(): void
  onPreview(): void
}

const PostEditorHeader = ({
  isEditPost,
  steps,
  activeStep,
  savable,
  onBack,
  onSaveDraft,
  onPreview
}: CreatePostHeaderProps) => {
  return (
    <Stack>
      <Header
        title={isEditPost ? '編輯貼文' : '發文'}
        leftButton={<BackButton onClick={onBack} />}
        rightButton={
          isEditPost ? (
            <Button onClick={onPreview}>預覽</Button>
          ) : (
            <Button disabled={!savable} onClick={onSaveDraft}>
              存成草稿
            </Button>
          )
        }
      />
      <ProgressBar />
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
