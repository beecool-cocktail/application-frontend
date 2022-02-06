import { Check } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export interface SubmitButtonProps {
  color?: string
}

const SubmitButton = ({ color = 'black' }: SubmitButtonProps) => {
  return (
    <IconButton type="submit">
      <Check sx={{ color }} />
    </IconButton>
  )
}

export default SubmitButton
