import React from 'react'
import { Button, Stack } from '@mui/material'
import TopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import ProgressBar from './progressBar'

interface CreatePostHeaderProps {
  isEditPost: boolean
  totalStep: number
  activeStep: number
  savable: boolean
  onBack(): void
  onSaveDraft(): void
  onPreview(): void
}

const PostEditorTopNavigation = ({
  isEditPost,
  totalStep,
  activeStep,
  savable,
  onBack,
  onSaveDraft,
  onPreview
}: CreatePostHeaderProps) => {
  return (
    <Stack>
      <TopNavigation
        leftSlot={() => <BackButton onClick={onBack} />}
        rightSlot={() => {
          if (isEditPost) {
            if (activeStep !== 2)
              return (
                <Button disabled={!savable} onClick={onPreview}>
                  預覽
                </Button>
              )
            return null
          }
          return (
            <Button disabled={!savable} onClick={onSaveDraft}>
              存成草稿
            </Button>
          )
        }}
      />
      <ProgressBar totalStep={totalStep} activeStep={activeStep} />
    </Stack>
  )
}

export default PostEditorTopNavigation
