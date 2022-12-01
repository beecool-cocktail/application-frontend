import { IconButton } from '@mui/material'
import DeleteIcon from 'lib/assets/deleteInputOutlined.svg'

export interface RemoveButtonProps {
  color?: string
  disabled?: boolean
  onClick: () => void
}

const RemoveButton = ({
  color = 'white',
  disabled = false,
  onClick
}: RemoveButtonProps) => {
  return (
    <IconButton
      onClick={() => {
        if (disabled) return
        onClick()
      }}
      sx={{ fontSize: 24, color }}
    >
      <DeleteIcon />
    </IconButton>
  )
}

export default RemoveButton
