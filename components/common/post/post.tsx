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
import { CocktailPost } from 'lib/domain/cocktail'
import ImageSwiper from './ImageSwiper'
import PostHeader from './postHeader'

export type CocktailDetailsProps = {
  cocktailPost: CocktailPost
}

const Post = ({ cocktailPost }: CocktailDetailsProps) => {
  const photos = cocktailPost.photos.length
    ? cocktailPost.photos.map(p => p.path)
    : [FALLBACK_URL]
  return (
    <Stack>
      <ImageSwiper title={cocktailPost.title} photos={photos} />
      <Stack p={2}>
        <PostHeader
          title={cocktailPost.title}
          userName={cocktailPost.userName}
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
