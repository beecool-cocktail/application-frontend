import { Box, Typography, Paper, Stack } from '@mui/material'
import ShakerIcon from 'lib/assets/shakerOutlined.svg'
import { Step } from 'lib/domain/cocktail'
import StepRow from './stepRow'

interface StepListProps {
  steps: Step[]
}

const StepList = ({ steps }: StepListProps) => {
  return (
    <Box mt="24px">
      <Stack direction="row" sx={{ px: '12px', py: '4px' }}>
        <Box sx={{ fontSize: 24 }}>
          <ShakerIcon />
        </Box>
        <Typography
          variant="body1"
          sx={{
            ml: '12px',
            color: theme => theme.palette.light1.main,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          步驟教學
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ml: '8px',
            color: theme => theme.palette.light1.main,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold'
          }}
        >
          Step By Step
        </Typography>
      </Stack>
      <Paper
        sx={{
          borderRadius: 4,
          mt: '12px',
          backgroundColor: theme => theme.palette.dark5.main
        }}
      >
        <Stack p="12px" spacing="24px">
          {steps.map((step, index) => (
            <StepRow
              key={index}
              stepNumber={index + 1}
              description={step.description}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  )
}

export default StepList
