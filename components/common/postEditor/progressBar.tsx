import { Box, Stack } from '@mui/material'

interface ProgressBarProps {
  totalStep: number
  activeStep: number
}

const ProgressBar = ({ totalStep, activeStep }: ProgressBarProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        bgcolor: theme => theme.palette.dark3.main,
        columnGap: '12px',
        width: 1,
        height: '40px',
        px: '40px',
        pt: '12px'
      }}
    >
      {Array.from(new Array(totalStep)).map((_, step) => {
        const isActiveOrPassed = activeStep >= step
        return (
          <Box
            key={step}
            sx={{
              bgcolor: theme =>
                isActiveOrPassed
                  ? theme.palette.primary.main
                  : theme.palette.light4.main,
              height: isActiveOrPassed ? '4px' : '2px',
              flex: 1
            }}
          ></Box>
        )
      })}
    </Stack>
  )
}

export default ProgressBar
