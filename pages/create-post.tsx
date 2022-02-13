import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Stack } from '@mui/material'
import CreatePostHeader from 'components/pages/create-post/createPostHeader'
import PostTutorial from 'components/pages/create-post/postTutorial'
import PostImageBlock from 'components/pages/create-post/postImageBlock'
import PostPreview from 'components/pages/create-post/postPreview'

const steps = ['step 1', 'step 2', 'step 3']

const CreatePost = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleBack = () => {
    setActiveStep(prevStep => {
      if (prevStep <= 0) {
        router.back()
        return prevStep
      }
      return prevStep - 1
    })
  }

  const handleNext = () => {
    setActiveStep(prevStep => {
      if (prevStep >= steps.length - 1) return prevStep
      return prevStep + 1
    })
  }

  const handleSaveDraft = () => {
    // TODO
  }

  const handleSubmit = () => {
    // TODO
  }

  const renderButton = () => {
    let onClick
    let label
    if (activeStep === 0) {
      onClick = handleNext
      label = '下一步'
    }
    if (activeStep === 1) {
      onClick = handleNext
      label = '預覽'
    }
    if (activeStep === 2) {
      onClick = handleSubmit
      label = '發布'
    }
    return (
      <Button variant="contained" onClick={onClick}>
        {label}
      </Button>
    )
  }

  return (
    <Stack alignItems="stretch" minHeight="100vh">
      <CreatePostHeader
        steps={steps}
        activeStep={activeStep}
        onBack={handleBack}
        onSaveDraft={handleSaveDraft}
      />
      <Stack
        alignItems="center"
        justifyContent="flex-start"
        flex={1}
        mt={3}
        padding={1}
      >
        {activeStep === 0 ? (
          <PostTutorial />
        ) : activeStep === 1 ? (
          <PostImageBlock />
        ) : (
          <PostPreview />
        )}
      </Stack>
      <Stack
        direction="row"
        height={100}
        padding={1}
        alignItems="center"
        justifyContent="flex-end"
      >
        {renderButton()}
      </Stack>
    </Stack>
  )
}

export default CreatePost
