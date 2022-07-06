import { Box, Stack, Skeleton, Divider } from '@mui/material'

const PostSkeleton = () => {
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
        sx={{ aspectRatio: '4/3' }}
      />
      <Box width={1} pt="40px" px="30px">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="30px"
          sx={{ borderRadius: '4px' }}
        />
        <Stack width={1} direction="row" spacing="9px" mt="34px">
          <Skeleton variant="circular" width={34} height={34} />
          <Stack spacing="4px">
            <Skeleton
              variant="rectangular"
              height={20}
              width={240}
              sx={{ borderRadius: '4px' }}
            />
            <Skeleton
              variant="rectangular"
              height={20}
              width={65}
              sx={{ borderRadius: '4px' }}
            />
          </Stack>
        </Stack>
        <Stack width={1} spacing="4px" mt="23px">
          <Skeleton
            variant="rectangular"
            height={26}
            width={308}
            sx={{ borderRadius: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            height={26}
            width={261}
            sx={{ borderRadius: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            height={26}
            width={194}
            sx={{ borderRadius: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            height={26}
            width={137}
            sx={{ borderRadius: '4px' }}
          />
        </Stack>
        <Divider sx={{ mt: '38px' }} variant="fullWidth" />
        <Skeleton
          variant="rectangular"
          height={26}
          width={137}
          sx={{ borderRadius: '4px', mt: '26px' }}
        />
        <Skeleton
          variant="rectangular"
          height={171}
          width="100%"
          sx={{ borderRadius: '10px', mt: '18px' }}
        />
      </Box>
    </Box>
  )
}

export default PostSkeleton
