import { CircularProgress, Stack } from '@mui/material'

const Loading = () => {
  return (
    <Stack justifyContent="center" alignItems="center" width={1} height={1}>
      <CircularProgress
        sx={{
          color: theme => theme.palette.primary.darker
        }}
      />
    </Stack>
  )
}

export default Loading
