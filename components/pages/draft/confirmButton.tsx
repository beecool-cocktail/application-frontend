import BottomButton from 'components/common/button/bottomButton'

interface ConfirmButtonProps {
  selectedCount: number
  onClick(): void
}

const ConfirmButton = ({ selectedCount, onClick }: ConfirmButtonProps) => {
  return (
    <BottomButton
      position="fixed"
      disabled={selectedCount === 0}
      onClick={onClick}
    >{`確認刪除(${selectedCount})`}</BottomButton>
  )
}

export default ConfirmButton
