import { Check } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export interface SubmitButtonProps {
  disabled: boolean
  color?: string
}

const SubmitButton = ({ disabled }: SubmitButtonProps) => {
  return (
    <IconButton disabled={disabled} type="submit">
      <Check />
    </IconButton>
  )
}

export default SubmitButton
