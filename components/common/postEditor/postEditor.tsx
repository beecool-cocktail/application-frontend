import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { CocktailPostForm } from 'lib/types/cocktail'
import cocktailApi from 'lib/api/cocktail'
import { paths } from 'lib/configs/routes'
import SnackbarContext from 'lib/context/snackbarContext'
import storage from 'lib/helper/storage'
import { CocktailPostDraft } from 'lib/types/cocktail'
import useUserInfo from 'lib/hooks/useUserInfo'
import PostImageBlock from './postImageBlock'
import PostPreview from './postPreview'
import CreatePostHeader from './createPostHeader'
import PostTutorial from './postTutorial'

const steps = ['step 1', 'step 2', 'step 3']

const defaultIngredients = [{ unit: '', amount: 0, name: '' }]
const defaultSteps = [{ description: '' }]

const createModeDefaultValues = {
  title: '',
  description: '',
  photos: null,
  ingredient_list: defaultIngredients,
  step_list: defaultSteps
}

const getDefaultValues = (draft?: CocktailPostDraft) => {
  if (!draft) return createModeDefaultValues
  const ingredient_list = draft.ingredient_list.length
    ? draft.ingredient_list
    : defaultIngredients
  const step_list = draft.step_list.length ? draft.step_list : defaultSteps
  return {
    title: draft.title,
    description: draft.description,
    photos: null,
    ingredient_list,
    step_list
  }
}

interface PostEditorProps {
  draft?: CocktailPostDraft
}

const PostEditor = ({ draft }: PostEditorProps) => {
  const router = useRouter()
  const { userInfo } = useUserInfo()
  const { api: snackbar } = useContext(SnackbarContext)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty }
  } = useForm<CocktailPostForm>({
    defaultValues: getDefaultValues(draft)
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

  const onSaveDraft = async (form: CocktailPostForm) => {
    const token = storage.getToken()
    if (!token) return
    await cocktailApi.createCocktailPostDraft(form, token)
    router.push(paths.profile)
    snackbar.success({ message: 'saved!' })
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
      label = draft ? '重新發佈' : '發布'
    }
    return (
      <Button
        variant="contained"
        disabled={false}
        type={type}
        onClick={onClick}
      >
        {label}
      </Button>
    )
  }

  if (!userInfo) return null

  return (
    <Stack alignItems="stretch" minHeight="100vh">
      <CreatePostHeader
        steps={steps}
        activeStep={activeStep}
        savable={isDirty}
        onBack={handleBack}
        onSaveDraft={handleSubmit(onSaveDraft)}
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
                cocktail_id: 0,
                user_id: userInfo.user_id,
                user_name: userInfo.user_name,
                title: values.title,
                description: values.description,
                photos: previewUrls,
                step_list: values.step_list,
                ingredient_list: values.ingredient_list
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

export default PostEditor
