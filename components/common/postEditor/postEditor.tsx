import { Button, Stack } from '@mui/material'
import { CocktailPost, CocktailPostDraft } from 'lib/domain/cocktail'
import useUser from 'lib/application/useUser'
import usePostEditor from 'lib/application/usePostEditor'
import PostImageBlock from './postImageBlock'
import PostPreview from './postPreview'
import PostEditorHeader from './postEditorHeader'
import PostTutorial from './postTutorial'

const steps = ['step 1', 'step 2', 'step 3']

export interface PostEditorProps {
  draft?: CocktailPostDraft
  isDraft?: boolean
}

const PostEditor = ({ draft, isDraft = false }: PostEditorProps) => {
  const { user } = useUser()
  const {
    form: { control, getValues, isDirty },
    activeStep,
    previewUrls,
    goBack,
    goNext,
    saveDraft,
    submit,
    handlePreviewUrlsChange
  } = usePostEditor(isDraft, draft)

  const renderButton = () => {
    let type: 'button' | 'submit' = 'button'
    let onClick = goNext
    let label
    if (activeStep === 0) label = '下一步'
    if (activeStep === 1) label = '預覽'
    if (activeStep === 2) {
      type = 'submit'
      onClick = submit
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

  if (!user) return null

  return (
    <Stack alignItems="stretch" minHeight="100vh">
      <PostEditorHeader
        isDraft={isDraft}
        isEdit={Boolean(draft)}
        steps={steps}
        activeStep={activeStep}
        savable={isDirty}
        onBack={goBack}
        onSaveDraft={saveDraft}
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
              const cocktailPost: CocktailPost = {
                id: draft ? draft.id : 0,
                userId: user.id,
                userName: user.username,
                userPhoto: user.photo,
                title: values.title,
                description: values.description,
                photos: previewUrls.map(url => ({ id: 0, path: url })),
                steps: values.steps,
                ingredients: values.ingredients,
                isCollected: false,
                createdDate: ''
              }
              return cocktailPost
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
