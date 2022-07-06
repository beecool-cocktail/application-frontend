import { Divider, Stack } from '@mui/material'
import { FALLBACK_URL } from 'lib/constants/image'
import { CocktailPost, CocktailPostPreview } from 'lib/domain/cocktail'
import TitleUserInfo from './titleUserInfo'
import Description from './description'
import IngredientList from './ingredientList'
import StepList from './stepList'
import Swiper from './swiper'
import TopNavigation from './topNavigation'

export type PostProps = {
  cocktailPost: CocktailPost | CocktailPostPreview
  onCollect?(): void
}

const Post = ({ cocktailPost, onCollect }: PostProps) => {
  const getPhotoUrls = (): string[] => {
    if (!cocktailPost.photos.length) return [FALLBACK_URL]
    if ('createdDate' in cocktailPost)
      return cocktailPost.photos.map(p => p.path)
    return cocktailPost.photos
  }

  return (
    <Stack>
      <TopNavigation title={cocktailPost.title} />
      <Swiper
        title={cocktailPost.title}
        isCollected={cocktailPost.isCollected}
        photoUrls={getPhotoUrls().map(p => ({ path: p, blurPath: '' }))}
        onCollect={onCollect}
      />
      <Stack sx={{ px: '32px', pt: '12px' }}>
        <TitleUserInfo
          title={cocktailPost.title}
          userId={cocktailPost.userId}
          userName={cocktailPost.userName}
          userPhoto={cocktailPost.userPhoto}
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
