import { CircularProgress, Stack } from '@mui/material'

const Spinner = () => {
  return (
    <Stack justifyContent="center" alignItems="center" width={1} height={1}>
      <CircularProgress />
    </Stack>
  )
}

export default Spinner
