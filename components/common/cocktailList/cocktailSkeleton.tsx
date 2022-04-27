import { Box, Stack, Skeleton } from '@mui/material'

const CocktailSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      rowGap="4px"
    >
      <Skeleton
        variant="rectangular"
        height="unset"
        width="100%"
        sx={{ borderRadius: '10px', aspectRatio: '4/3' }}
      />
      <Stack width={1} spacing="4px" px="2px" py="4px">
        <Skeleton
          variant="rectangular"
          height={25}
          width="100%"
          sx={{ borderRadius: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          height={20}
          width={247}
          sx={{ borderRadius: '4px' }}
        />
      </Stack>
    </Box>
  )
}

export default CocktailSkeleton
