import { Remove } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export interface RemoveButtonProps {
  color?: string
  onClick: () => void
}

const RemoveButton = ({
  color = 'white',
  onClick: handleClick
}: RemoveButtonProps) => {
  return (
    <IconButton
      size="small"
      onClick={handleClick}
      style={{ backgroundColor: 'black', width: 30, height: 30 }}
    >
      <Remove sx={{ color }} />
    </IconButton>
  )
}

export default RemoveButton
