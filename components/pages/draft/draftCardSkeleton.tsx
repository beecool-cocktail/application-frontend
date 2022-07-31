import { Skeleton } from '@mui/material'

const DraftCardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={77}
      sx={{ borderRadius: '6px' }}
    />
  )
}

export default DraftCardSkeleton
