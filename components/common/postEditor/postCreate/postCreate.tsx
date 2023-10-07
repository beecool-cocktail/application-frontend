import { Stack } from '@mui/material'
import { Control } from 'react-hook-form'
import {
  CocktailPostDraft,
  CocktailPostForm,
  CocktailPostPreview
} from 'lib/domain/cocktail'
import userCurrentUser from 'lib/application/user/useCurrentUser'
import usePostCreate from 'lib/application/cocktail/usePostCreate'
import BottomButton from 'components/common/button/bottomButton'
import PostCreateStep1 from '../postCreate/postCreateStep1'
import PostCreateStep2 from '../postCreate/postCreateStep2'
import PostCreateStep3 from '../postCreate/postCreateStep3'
import ProgressBar from '../progressBar'
import PostCreatorTopNavigation from './postCreateTopNavigation'

interface PostCreateProps {
  cocktailDraft?: CocktailPostDraft
}

const PostCreate = ({ cocktailDraft }: PostCreateProps) => {
  const { user } = userCurrentUser()
  const {
    getValues,
    isDraftValid,
    step1Control,
    step2Control,
    buttonAction,
    totalStep,
    activeStep,
    goBack,
    saveDraft,
    handleImageToCover,
    handleImageUpload,
    handleImageReUpload,
    handleImageEdit,
    handleImageDelete
  } = usePostCreate(cocktailDraft)
  if (!user) return null

  return (
    <Stack position="relative" alignItems="stretch" minHeight={1}>
      <Stack
        position="sticky"
        top={0}
        bgcolor={theme => theme.palette.background.default}
        zIndex={1200}
      >
        <PostCreatorTopNavigation
          activeStep={activeStep}
          savable={isDraftValid}
          onBack={goBack}
          onSaveDraft={saveDraft}
        />
        <ProgressBar totalStep={totalStep} activeStep={activeStep} />
      </Stack>
      <Stack alignItems="center" justifyContent="flex-start" flex={1} px={2}>
        {activeStep === 0 ? (
          <PostCreateStep1
            control={step1Control as unknown as Control<CocktailPostForm>}
          />
        ) : activeStep === 1 ? (
          <PostCreateStep2
            control={step2Control as unknown as Control<CocktailPostForm>}
            onImageEdit={handleImageEdit}
            onImageUpload={handleImageUpload}
            onImageReUpload={handleImageReUpload}
            onImageToCover={handleImageToCover}
            onImageDelete={handleImageDelete}
          />
        ) : (
          <PostCreateStep3
            cocktailPost={(() => {
              const values = getValues()
              const cocktailPost: CocktailPostPreview = {
                id: 0,
                userId: user.id,
                userName: user.username,
                userPhoto: user.croppedAvatar,
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

export default PostCreate
