import { Remove } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export interface RemoveButtonProps {
  color?: string
  onClick: () => void
}

const RemoveButton = ({
  color = 'black',
  onClick: handleClick
}: RemoveButtonProps) => {
  return (
    <IconButton onClick={handleClick}>
      <Remove sx={{ color }} />
    </IconButton>
  )
}

export default RemoveButton
