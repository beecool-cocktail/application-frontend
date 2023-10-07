import BottomButton from 'components/common/button/bottomButton'

interface ConfirmButtonProps {
  disabled?: boolean
  onClick(): void
}

const ConfirmButton = ({ disabled, onClick }: ConfirmButtonProps) => {
  return (
    <BottomButton
      disabled={disabled}
      position="fixed"
      sx={{ width: 1 }}
      onClick={onClick}
    >
      確認
    </BottomButton>
  )
}

export default ConfirmButton
