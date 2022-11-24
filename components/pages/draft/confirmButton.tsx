import FloatingButton from 'components/common/button/floatingButton'

interface ConfirmButtonProps {
  selectedCount: number
  onClick(): void
}

const ConfirmButton = ({ selectedCount, onClick }: ConfirmButtonProps) => {
  return (
    <FloatingButton
      disabled={selectedCount === 0}
      onClick={onClick}
    >{`確認刪除(${selectedCount})`}</FloatingButton>
  )
}

export default ConfirmButton
