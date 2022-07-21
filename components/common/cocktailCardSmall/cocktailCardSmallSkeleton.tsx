import { Skeleton } from '@mui/material'

const CocktailCardSmallSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      height="unset"
      width="100%"
      sx={{ borderRadius: '6px', aspectRatio: '176/171' }}
    />
  )
}

export default CocktailCardSmallSkeleton
