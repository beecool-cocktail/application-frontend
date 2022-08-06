import { Box, Stack, Skeleton } from '@mui/material'

const DraftCardSkeleton = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap="12px"
      sx={{
        cursor: 'pointer',
        position: 'relative',
        width: 1,
        height: 77,
        borderRadius: '6px',
        px: '8px',
        bgcolor: theme => theme.palette.dark4.main
      }}
    >
      <Stack
        flex={1}
        direction="row"
        alignItems="flex-start"
        sx={{ minWidth: 0 }}
      >
        <Skeleton
          variant="rectangular"
          width={81}
          height={61}
          sx={{ borderRadius: '4px' }}
        />
        <Stack
          flex={1}
          alignItems="flex-start"
          justifyContent="flex-start"
          rowGap="6px"
          sx={{ ml: '8px', alignSelf: 'stretch', minWidth: 0 }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height={24}
            sx={{ borderRadius: '4px' }}
          />
          <Skeleton
            variant="rectangular"
            width={160}
            height={18}
            sx={{ borderRadius: '4px' }}
          />
        </Stack>
      </Stack>
      <Box width={24} height={24}></Box>
    </Stack>
  )
}

export default DraftCardSkeleton
