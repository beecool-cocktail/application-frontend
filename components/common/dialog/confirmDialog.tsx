import useConfirmDialog from 'lib/application/ui/useConfirmDialog'
import BaseDialog from './baseDialog'

const ConfirmDialog = () => {
  const { isOpen, title, content, onConfirm, onCancel } = useConfirmDialog()

  return (
    <BaseDialog
      open={isOpen}
      title={title}
      content={content}
      onClose={onCancel}
      onConfirm={onConfirm}
    />
  )
}

export default ConfirmDialog
