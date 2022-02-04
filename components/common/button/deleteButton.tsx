import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export interface DeleteButtonProps {
  color?: string
  onClick: () => void
}

const DeleteButton = ({
  color = 'black',
  onClick: handleClick
}: DeleteButtonProps) => {
  return (
    <IconButton onClick={handleClick}>
      <Delete sx={{ color }} />
    </IconButton>
  )
}

export default DeleteButton
