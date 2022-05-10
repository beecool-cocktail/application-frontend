import { Box, CircularProgress, Stack } from '@mui/material'

export interface LoadingProps {
  size?: number
}

const Loading = ({ size = 32 }: LoadingProps) => {
  return (
    <Stack justifyContent="center" alignItems="center" width={1}>
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <CircularProgress
          variant="determinate"
          size={size}
          sx={{ color: theme => theme.palette.primary.darker }}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={size}
          sx={{
            color: theme => theme.palette.primary.subtle,
            animationDuration: '550ms',
            position: 'absolute',
            left: 0
          }}
          value={30}
        />
      </Box>
    </Stack>
  )
}

export default Loading
