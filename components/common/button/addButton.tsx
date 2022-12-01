import AddIcon from '/lib/assets/plusAddOutlined.svg'
import { IconButton } from '@mui/material'

export interface AddButtonProps {
  color?: string
  onClick: () => void
}

const AddButton = ({
  color = 'brandWhite.main',
  onClick: handleClick
}: AddButtonProps) => {
  return (
    <IconButton onClick={handleClick} sx={{ color }}>
      <AddIcon />
    </IconButton>
  )
}

export default AddButton
