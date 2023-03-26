import { Stack } from '@mui/material'
import { CocktailPostPreview, CocktailPostDraft } from 'lib/domain/cocktail'
import userCurrentUser from 'lib/application/user/useCurrentUser'
import usePostEditor from 'lib/application/cocktail/usePostEditor'
import BottomButton from 'components/common/button/bottomButton'
import PostEditorStep1 from './postEditorStep1'
import PostEditorStep2 from './postEditorStep2'
import PostEditorStep3 from './postEditorStep3'
import PostEditorTopNavigation from './postEditorTopNavigation'

export interface PostEditorProps {
  cocktail?: CocktailPostDraft
  isDraft?: boolean
}

const PostEditor = ({ cocktail, isDraft = false }: PostEditorProps) => {
  const { user } = userCurrentUser()
  const {
    getValues,
    isDraftValid,
    step1Control,
    step2Control,
    buttonAction,
    isEditPost,
    totalStep,
    activeStep,
    goBack,
    goPreview,
    saveDraft,
    handleImageUpload,
    handleImageToCover,
    handleImageEdit,
    handleImageDelete
  } = usePostEditor(isDraft, cocktail)
  if (!user) return null

  return (
    <Stack position="relative" alignItems="stretch" minHeight={1}>
      <PostEditorTopNavigation
        isEditPost={isEditPost}
        totalStep={totalStep}
        activeStep={activeStep}
        savable={isDraftValid}
        onBack={goBack}
        onPreview={goPreview}
        onSaveDraft={saveDraft}
      />
      <Stack alignItems="center" justifyContent="flex-start" flex={1} px={2}>
        {activeStep === 0 ? (
          <PostEditorStep1 control={step1Control} />
        ) : activeStep === 1 ? (
          <PostEditorStep2
            control={step2Control}
            onImageUpload={handleImageUpload}
            onImageToCover={handleImageToCover}
            onImageEdit={handleImageEdit}
            onImageDelete={handleImageDelete}
          />
        ) : (
          <PostEditorStep3
            cocktailPost={(() => {
              const values = getValues()
              const cocktailPost: CocktailPostPreview = {
                id: cocktail ? cocktail.id : 0,
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
      <BottomButton
        position="static"
        type={buttonAction.type}
        disabled={!buttonAction.isValid}
        onClick={buttonAction.onClick}
      >
        {buttonAction.label}
      </BottomButton>
    </Stack>
  )
}

export default PostEditor
