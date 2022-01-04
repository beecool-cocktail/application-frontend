import { Check } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { grey } from '@mui/material/colors'

export interface SubmitButtonProps {
  color?: string
  onClick: () => void
}

const SubmitButton = ({
  color = 'black',
  onClick: handleClick
}: SubmitButtonProps) => {
  return (
    <IconButton onClick={handleClick}>
      <Check sx={{ color }} />
    </IconButton>
  )
}

export default SubmitButton
