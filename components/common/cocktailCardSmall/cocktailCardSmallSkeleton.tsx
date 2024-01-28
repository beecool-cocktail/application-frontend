import { Skeleton } from '@mui/material'
import { COCKTAIL_CARD_SMALL_RATIO } from 'lib/constants/layout'

const CocktailCardSmallSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      height="unset"
      width="100%"
      sx={{ borderRadius: '6px', aspectRatio: COCKTAIL_CARD_SMALL_RATIO }}
    />
  )
}

export default CocktailCardSmallSkeleton
