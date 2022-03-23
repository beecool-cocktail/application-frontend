import { Delete } from '@mui/icons-material'
import { Box } from '@mui/material'
import { IconButton } from '@mui/material'

export interface DeleteButtonProps {
  color?: string
  batchMode?: boolean
  onClick: () => void
}

const DeleteButton = ({
  color = 'white.main',
  batchMode = false,
  onClick: handleClick
}: DeleteButtonProps) => {
  return (
    <Box
      borderRadius="50%"
      sx={{ backgroundColor: batchMode ? '#ccc' : 'transparent' }}
    >
      <IconButton onClick={handleClick}>
        <Delete sx={{ color }} />
      </IconButton>
    </Box>
  )
}

export default DeleteButton
