import { Remove } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export interface RemoveButtonProps {
  color?: string
  disabled?: boolean
  onClick: () => void
}

const SIZE = 30

const RemoveButton = ({
  color = 'white',
  disabled = false,
  onClick
}: RemoveButtonProps) => {
  return (
    <IconButton
      size="small"
      onClick={() => {
        if (disabled) return
        onClick()
      }}
      style={{
        width: SIZE,
        height: SIZE,
        backgroundColor: disabled ? 'grey' : 'black',
        cursor: disabled ? 'default' : 'pointer'
      }}
    >
      <Remove sx={{ color }} />
    </IconButton>
  )
}

export default RemoveButton
