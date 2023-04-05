import BottomButton from 'components/common/button/bottomButton'

interface ConfirmButtonProps {
  onClick(): void
}

const ConfirmButton = ({ onClick }: ConfirmButtonProps) => {
  return (
    <BottomButton position="fixed" sx={{ width: 1 }} onClick={onClick}>
      確認
    </BottomButton>
  )
}

export default ConfirmButton
