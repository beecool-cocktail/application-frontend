import { Stack } from '@mui/material'
import { CocktailPostPreview, CocktailPostDraft } from 'lib/domain/cocktail'
import userCurrentUser from 'lib/application/user/useCurrentUser'
import usePostCreate from 'lib/application/cocktail/usePostEditor'
import BottomButton from 'components/common/button/bottomButton'
import PostEditorTopNavigation from '../postEditor/postEditorTopNavigation'
import PostEditorStep1 from './postEditorStep1'
import PostEditorStep2 from './postEditorStep2'

export interface PostCreatorProps {
  cocktail: CocktailPostDraft
}

const PostEditor = ({ cocktail }: PostCreatorProps) => {
  const { user } = userCurrentUser()
  const {
    isValid,
    getValues,
    control,
    buttonAction,
    activeStep,
    goBack,
    goPreview,
    handleImageToCover,
    handleImageUpload,
    handleImageReUpload,
    handleImageEdit,
    handleImageDelete
  } = usePostCreate(cocktail)
  if (!user) return null

  return (
    <Stack position="relative" alignItems="stretch" minHeight={1}>
      <PostEditorTopNavigation
        activeStep={activeStep}
        savable={isValid}
        onBack={goBack}
        onPreview={goPreview}
      />
      <Stack alignItems="center" justifyContent="flex-start" flex={1} px={2}>
        {activeStep === 0 ? (
          <PostEditorStep1
            control={control}
            onImageEdit={handleImageEdit}
            onImageUpload={handleImageUpload}
            onImageReUpload={handleImageReUpload}
            onImageToCover={handleImageToCover}
            onImageDelete={handleImageDelete}
          />
        ) : (
          <PostEditorStep2
            cocktailPost={(() => {
              const values = getValues()
              const cocktailPost: CocktailPostPreview = {
                id: cocktail.id,
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
        position="sticky"
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
