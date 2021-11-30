import { CircularProgress, Stack } from '@mui/material'

const LoadingScreen = () => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ flex: '1' }}>
      <CircularProgress />
    </Stack>
  )
}

export default LoadingScreen
