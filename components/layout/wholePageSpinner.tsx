import { Box, Stack } from '@mui/material'
import Rive from '@rive-app/react-canvas'
import useWholePageSpinner from 'lib/application/ui/useWholePageSpinner'

const stateMachineName = 'State Machine 1'

const size = 100

const WholePageSpinner = () => {
  const { loading } = useWholePageSpinner()

  if (!loading) return null
  return (
    <Stack
      sx={{
        zIndex: 1500,
        position: 'fixed',
        width: 1,
        height: 1,
        top: 0,
        left: 0,
        background: 'rgba(24, 24, 24, 0.8)'
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          background: theme => theme.palette.dark1.main,
          borderRadius: '20px'
        }}
      >
        <Rive
          src="/loading.riv"
          artboard="Loading Animation Final"
          stateMachines={stateMachineName}
          width={size}
          height={size}
          style={{ width: size, height: size }}
        />
      </Box>
    </Stack>
  )
}

export default WholePageSpinner
