import React from 'react'
import { Button } from '@mui/material'
import TopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'

interface PostCreateTopNavigationProps {
  activeStep: number
  savable: boolean
  onBack(): void
  onSaveDraft(): void
}

const PostCreateTopNavigation = ({
  savable,
  activeStep,
  onBack,
  onSaveDraft
}: PostCreateTopNavigationProps) => {
  return (
    <TopNavigation
      position="static"
      title={() => {
        if (activeStep === 2) return '預覽'
        return ''
      }}
      leftSlot={() => <BackButton onClick={onBack} />}
      rightSlot={() => (
        <Button disabled={!savable} onClick={onSaveDraft}>
          存成草稿
        </Button>
      )}
    />
  )
}

export default PostCreateTopNavigation
