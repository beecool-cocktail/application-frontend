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
      <Box>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999,
            width: '100%'
          }}
        >
          <TopNavigation title={cocktailPost.title} />
        </Box>
        <CocktailSwiper
          title={cocktailPost.title}
          images={getPhotoUrls().map(p => ({ path: p, blurPath: '' }))}
          isCollected={cocktailPost.isCollected}
          onCollect={() => onCollect?.()}
        />
      </Box>
      <Stack sx={{ px: '32px', pt: '12px' }}>
        <PostHeader
          title={cocktailPost.title}
          userId={cocktailPost.userId}
          userName={cocktailPost.userName}
          userPhoto={cocktailPost.userPhoto}
        />
        <Box mt="12px">
          <Typography
            variant="body2"
            sx={{ color: theme => theme.palette.light2.main }}
          >
            {cocktailPost.description}
          </Typography>
        </Box>
        <Divider sx={{ mt: '24px' }} variant="fullWidth" />
        <Box py={2}>
          <Typography
            variant="body1"
            sx={{ color: theme => theme.palette.light1.main }}
          >
            備料清單 Ingredients
          </Typography>
          <Paper
            sx={{
              borderRadius: 4,
              mt: '20px',
              backgroundColor: theme => theme.palette.dark5.main
            }}
          >
            <Box p="12px">
              <FormGroup>
                {cocktailPost.ingredients.map((ingredient, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    sx={{
                      '.MuiFormControlLabel-label': {
                        flex: 1
                      }
                    }}
                    label={
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="body2"
                          sx={{ color: theme => theme.palette.light2.main }}
                        >{`${index + 1}. ${ingredient.name}`}</Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme => theme.palette.light2.main }}
                        >
                          {ingredient.amount}
                        </Typography>
                      </Stack>
                    }
                  />
                ))}
              </FormGroup>
            </Box>
          </Paper>
        </Box>
        <Box py={2}>
          <Typography
            variant="body1"
            sx={{ color: theme => theme.palette.light1.main }}
          >
            步驟教學 Step By Step
          </Typography>
          <Paper sx={{ borderRadius: 4, mt: 2 }}>
            <Box p={2}>
              {cocktailPost.steps.map((step, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: theme => theme.palette.light2.main }}
                >
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
