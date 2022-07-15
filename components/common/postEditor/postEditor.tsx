import { Button, Stack } from '@mui/material'
import { CocktailPostPreview, CocktailPostDraft } from 'lib/domain/cocktail'
import userCurrentUser from 'lib/application/user/useCurrentUser'
import usePostEditor from 'lib/application/usePostEditor'
import PostImageBlock from './postImageBlock'
import PostPreview from './postPreview'
import PostEditorHeader from './postEditorHeader'
import PostTutorial from './postTutorial'

export interface PostEditorProps {
  draft?: CocktailPostDraft
  isDraft?: boolean
}

const PostEditor = ({ draft, isDraft = false }: PostEditorProps) => {
  const { user } = userCurrentUser()
  const {
    form: { control, getValues, isDirty },
    isEditPost,
    steps,
    activeStep,
    goBack,
    goNext,
    goPreview,
    saveDraft,
    submit,
    handleImageUpload,
    handleImageToCover,
    handleImageEdit,
    handleImageDelete
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
        isEditPost={isEditPost}
        steps={steps}
        activeStep={activeStep}
        savable={isDirty}
        onBack={goBack}
        onPreview={goPreview}
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
            onImageUpload={handleImageUpload}
            onImageToCover={handleImageToCover}
            onImageEdit={handleImageEdit}
            onImageDelete={handleImageDelete}
          />
        ) : (
          <PostPreview
            cocktailPost={(() => {
              const values = getValues()
              const cocktailPost: CocktailPostPreview = {
                id: draft ? draft.id : 0,
                userId: user.id,
                userName: user.username,
                userPhoto: user.photo,
                title: values.title,
                description: values.description,
                photos: values.photos.map(p => p.editedURL),
                steps: values.steps,
                ingredients: values.ingredients,
                isCollected: false
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
