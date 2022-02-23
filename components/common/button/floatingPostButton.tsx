import { Box, Fab } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

export interface FloatingPostButtonProps {
  onClick(): void
}

const FloatingPostButton = ({ onClick }: FloatingPostButtonProps) => {
  return (
    <Box position="fixed" right={10} bottom={72} zIndex={1}>
      <Fab color="primary" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default FloatingPostButton
