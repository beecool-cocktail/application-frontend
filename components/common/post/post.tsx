import { Divider, Stack } from '@mui/material'
import { CocktailPost, CocktailPostPreview } from 'lib/domain/cocktail'
import { PhotoWithBlur } from 'lib/domain/photo'
import CocktailSwiper from '../cocktailSwiper/cocktailSwiper'
import TitleUserInfo from './titleUserInfo'
import Description from './description'
import IngredientList from './ingredientList'
import StepList from './stepList'
import TopNavigation from './topNavigation'

export type PostProps = {
  cocktailPost: CocktailPost | CocktailPostPreview
  editable?: boolean
  isPreview?: boolean
  onCollect?(): void
  onEdit?(): void
}

const Post = ({
  cocktailPost,
  editable = false,
  isPreview = false,
  onCollect,
  onEdit
}: PostProps) => {
  const getImages = (): PhotoWithBlur[] => {
    if ('createdDate' in cocktailPost) return cocktailPost.photos
    return cocktailPost.photos.map((p, index) => ({
      id: index,
      path: p,
      blurPath: ''
    }))
  }

  return (
    <Stack>
      {!isPreview && (
        <TopNavigation
          title={cocktailPost.title}
          editable={editable}
          onEdit={onEdit}
        />
      )}
      <CocktailSwiper
        title={cocktailPost.title}
        isCollected={cocktailPost.isCollected}
        images={getImages()}
        onCollect={onCollect}
      />
      <Stack sx={{ px: '32px', pt: '12px' }}>
        <TitleUserInfo
          title={cocktailPost.title}
          userId={cocktailPost.userId}
          userName={cocktailPost.userName}
          userPhoto={cocktailPost.userPhoto}
          isPreview={isPreview}
        />
        <Description content={cocktailPost.description} />
        <Divider sx={{ mt: '24px' }} variant="fullWidth" />
      </Stack>
      <Stack sx={{ px: '16px' }}>
        <IngredientList ingredients={cocktailPost.ingredients} />
        <StepList steps={cocktailPost.steps} />
      </Stack>
    </Stack>
  )
}

export default Post
