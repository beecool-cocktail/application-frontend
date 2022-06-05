import {
  Divider,
  Stack,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { Box } from '@mui/system'
import { FALLBACK_URL } from 'lib/constants/image'
import { CocktailPost, CocktailPostPreview } from 'lib/domain/cocktail'
import CocktailSwiper from '../cocktailList/cocktailSwiper'
import PostHeader from './postHeader'

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
      <CocktailSwiper
        title={cocktailPost.title}
        images={getPhotoUrls().map(p => ({ path: p, blurPath: '' }))}
        isCollected={cocktailPost.isCollected}
        onCollect={() => onCollect?.()}
      />
      <Stack p={2}>
        <PostHeader
          title={cocktailPost.title}
          userId={cocktailPost.userId}
          userName={cocktailPost.userName}
          userPhoto={cocktailPost.userPhoto}
        />
        <Box py={2}>
          <Typography>{cocktailPost.description}</Typography>
        </Box>
        <Divider variant="middle" />
        <Box py={2}>
          <Typography variant="h6">備料清單：</Typography>
          <Paper sx={{ borderRadius: 4, mt: 2 }}>
            <Box p={2}>
              <FormGroup>
                {cocktailPost.ingredients.map((ingredient, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={`${index + 1}. ${ingredient.name} ${
                      ingredient.amount
                    }`}
                  />
                ))}
              </FormGroup>
            </Box>
          </Paper>
        </Box>
        <Box py={2}>
          <Typography variant="h6">製作過程：</Typography>
          <Paper sx={{ borderRadius: 4, mt: 2 }}>
            <Box p={2}>
              {cocktailPost.steps.map((step, index) => (
                <Typography key={index} variant="subtitle1">
                  {`${index + 1}. ${step.description}`}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  )
}

export default Post
