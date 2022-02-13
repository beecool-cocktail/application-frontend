import { Add } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export interface AddButtonProps {
  color?: string
  onClick: () => void
}

const AddButton = ({
  color = 'black',
  onClick: handleClick
}: AddButtonProps) => {
  return (
    <IconButton onClick={handleClick}>
      <Add sx={{ color }} />
    </IconButton>
  )
}

export default AddButton
