import ConfirmIcon from 'lib/assets/confirm.svg'
import IconButton from './iconButton'

export interface SubmitButtonProps {
  disabled: boolean
  color?: string
  onClick?: () => void
}

const SubmitButton = ({ disabled, onClick }: SubmitButtonProps) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <ConfirmIcon />
    </IconButton>
  )
}

export default SubmitButton
