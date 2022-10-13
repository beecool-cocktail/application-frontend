import { Box, CircularProgress, Stack } from '@mui/material'

export interface WholePageSpinnerProps {
  loading: boolean
  size?: number
  children: React.ReactNode
}

const WholePageSpinner = ({
  size = 32,
  loading,
  children
}: WholePageSpinnerProps) => {
  return (
    <Stack sx={{ position: 'relative', width: 1 }}>
      {children}
      {loading && (
        <Stack
          sx={{
            width: 1,
            height: 1,
            top: 0,
            left: 0,
            position: 'absolute',
            background: 'rgba(24, 24, 24, 0.8)'
          }}
          justifyContent="center"
          alignItems="center"
          width={1}
        >
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
      )}
    </Stack>
  )
}

export default WholePageSpinner
