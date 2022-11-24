import FloatingButton from 'components/common/button/floatingButton'

interface ConfirmButtonProps {
  onClick(): void
}

const ConfirmButton = ({ onClick }: ConfirmButtonProps) => {
  return (
    <FloatingButton sx={{ width: 1 }} onClick={onClick}>
      確認
    </FloatingButton>
  )
}

export default ConfirmButton
