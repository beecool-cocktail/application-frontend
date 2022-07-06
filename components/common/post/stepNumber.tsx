import { Box, Typography } from '@mui/material'

interface StepNumberProps {
  stepNumber: number
}

const StepNumber = ({ stepNumber }: StepNumberProps) => {
  return (
    <Box
      sx={{
        width: '20px',
        height: '20px',
        backgroundColor: theme => theme.palette.primary.main,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: theme => theme.palette.light1.main,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {stepNumber}
      </Typography>
    </Box>
  )
}

export default StepNumber
