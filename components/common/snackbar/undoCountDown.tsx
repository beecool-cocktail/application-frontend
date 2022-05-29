import { Box, useTheme } from '@mui/material'
import { CountdownCircleTimer, ColorHex } from 'react-countdown-circle-timer'
import Button from '../button/button'

interface UndoCountDownProps {
  duration: number
  onUndo(): void
}

const UndoCountDown = ({
  duration: durationInMs,
  onUndo
}: UndoCountDownProps) => {
  const theme = useTheme()
  const durationInSec = durationInMs / 1000

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '8px'
      }}
    >
      <CountdownCircleTimer
        isPlaying
        size={20}
        strokeWidth={3}
        duration={durationInSec}
        trailColor="rgba(0,0,0,0)"
        strokeLinecap="butt"
        colors={theme.palette.light1.main as ColorHex}
      />
      <Button
        size="medium"
        variant="text"
        sx={{ p: 0, m: 0, width: 'auto', minWidth: 'auto' }}
        onClick={onUndo}
      >
        Undo
      </Button>
    </Box>
  )
}

export default UndoCountDown
