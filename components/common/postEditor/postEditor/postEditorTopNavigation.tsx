import React from 'react'
import { Button } from '@mui/material'
import TopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'

interface PostEditorHeaderProps {
  activeStep: number
  savable: boolean
  onBack(): void
  onPreview(): void
}

const PostEditorHeaderProps = ({
  activeStep,
  savable,
  onBack,
  onPreview
}: PostEditorHeaderProps) => {
  return (
    <TopNavigation
      position="sticky"
      title={() => {
        if (activeStep === 1) return '預覽'
        return ''
      }}
      leftSlot={() => <BackButton onClick={onBack} />}
      rightSlot={() => {
        if (activeStep < 1) {
          return (
            <Button disabled={!savable} onClick={onPreview}>
              預覽
            </Button>
          )
        }
        return null
      }}
    />
  )
}

export default PostEditorHeaderProps
