import useConfirmDialog from 'lib/application/ui/useConfirmDialog'
import BaseDialog from './baseDialog'

const ConfirmDialog = () => {
  const {
    isOpen,
    title,
    content,
    confirmText,
    cancelText,
    primaryButton,
    onlyConfirm,
    onConfirm,
    onCancel
  } = useConfirmDialog()

  return (
    <BaseDialog
      open={isOpen}
      title={title}
      content={content}
      confirmText={confirmText}
      cancelText={cancelText}
      primaryButton={primaryButton}
      onlyConfirm={onlyConfirm}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  )
}

export default ConfirmDialog
