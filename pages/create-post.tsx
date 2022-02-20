import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import CreatePostHeader from 'components/pages/create-post/createPostHeader'
import PostTutorial from 'components/pages/create-post/postTutorial'
import PostImageBlock from 'components/pages/create-post/postImageBlock'
import PostPreview from 'components/pages/create-post/postPreview'
import { CocktailPostForm } from 'lib/types/cocktail'
import cocktailApi from 'lib/api/cocktail'
import { paths } from 'lib/configs/routes'
import SnackbarContext from 'lib/context/snackbarContext'
import storage from 'lib/helper/storage'

const steps = ['step 1', 'step 2', 'step 3']

const CreatePost = () => {
  const router = useRouter()
  const { api: snackbar } = useContext(SnackbarContext)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const { control, handleSubmit, getValues } = useForm<CocktailPostForm>({
    defaultValues: {
      title: '',
      description: '',
      photos: null,
      ingredients: [{ unit: '', amount: 0, name: '' }],
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

  const handlePreviewUrlsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return setPreviewUrls([])
    let previewUrls = Array.from(e.target.files).map(file =>
      URL.createObjectURL(file)
    )
    if (previewUrls.length >= 5) {
      previewUrls = previewUrls.slice(0, 5)
    }
    setPreviewUrls(previewUrls)
  }

  const onSubmit = async (form: CocktailPostForm) => {
    const token = storage.getToken()
    if (!token) return
    await cocktailApi.createCocktailPost(form, token)
    router.push(paths.profile)
    snackbar.success({ message: 'saved!' })
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
          <PostImageBlock
            control={control}
            previewUrls={previewUrls}
            onChange={handlePreviewUrlsChange}
          />
        ) : (
          <PostPreview
            cocktailPost={(() => {
              const values = getValues()
              return {
                title: values.title,
                description: values.description,
                photos: previewUrls,
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
