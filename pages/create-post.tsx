import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import CreatePostHeader from 'components/pages/create-post/createPostHeader'
import PostTutorial from 'components/pages/create-post/postTutorial'
import PostImageBlock from 'components/pages/create-post/postImageBlock'
import PostPreview from 'components/pages/create-post/postPreview'
import { CocktailPostForm } from 'lib/types/cocktail'

const steps = ['step 1', 'step 2', 'step 3']

const CreatePost = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<number>(0)
  const { control, handleSubmit, getValues } = useForm<CocktailPostForm>({
    defaultValues: {
      title: '',
      description: '',
      photos: [],
      ingredients: [{ unit: '', amount: '', name: '' }],
      steps: [{ description: '' }]
    }
  })

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

  const onSubmit = (data: CocktailPostForm) => {
    // eslint-disable-next-line no-console
    console.log({ data })
  }

  const renderButton = () => {
    let type: 'button' | 'submit' = 'button'
    let onClick = handleNext
    let label
    if (activeStep === 0) label = '下一步'
    if (activeStep === 1) label = '預覽'
    if (activeStep === 2) {
      type = 'submit'
      onClick = handleSubmit(onSubmit)
      label = '發布'
    }
    return (
      <Button variant="contained" onClick={onClick} type={type}>
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
          <PostTutorial control={control} />
        ) : activeStep === 1 ? (
          <PostImageBlock control={control} />
        ) : (
          <PostPreview
            cocktailPost={(() => {
              const values = getValues()
              return {
                title: values.title,
                description: values.description,
                photos: ['/post.png'],
                steps: values.steps,
                ingredients: values.ingredients
              }
            })()}
          />
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
