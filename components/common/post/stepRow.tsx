import { Box, Stack, Typography } from '@mui/material'
import StepNumber from './stepNumber'

interface StepRow {
  stepNumber: number
  description: string
}

const StepRow = ({ stepNumber, description }: StepRow) => {
  return (
    <Stack direction="row" spacing="12px">
      <Box sx={{ p: '2px' }}>
        <StepNumber stepNumber={stepNumber} />
      </Box>
      <Typography
        variant="body2"
        sx={{ color: theme => theme.palette.light2.main }}
      >
        {description}
      </Typography>
    </Stack>
  )
}

export default StepRow
