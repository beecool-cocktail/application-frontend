import { Box, Stack, Skeleton } from '@mui/material'

const TitleSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="72px"
      height="24px"
      sx={{ borderRadius: '4px' }}
    />
  )
}

const InputSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height="50px"
      sx={{ borderRadius: '4px' }}
    />
  )
}

const TextAreaSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height="257px"
      sx={{ borderRadius: '4px' }}
    />
  )
}

const CocktailEditPostSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-stretch"
      rowGap="24px"
      pt="12px"
      px="16px"
    >
      <Stack gap="4px">
        <TitleSkeleton />
        <InputSkeleton />
      </Stack>
      <Stack gap="4px">
        <TitleSkeleton />
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
      </Stack>
      <Stack gap="4px">
        <TitleSkeleton />
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
      </Stack>
      <Stack gap="4px">
        <TitleSkeleton />
        <TextAreaSkeleton />
      </Stack>
    </Box>
  )
}

export default CocktailEditPostSkeleton
