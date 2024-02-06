import useLoginDialog from 'lib/application/hooks/ui/useLoginDialog'
import dialogMessages from 'lib/application/constants/dialogMessages'
import BaseDialog from './baseDialog'

const LoginDialog = () => {
  const { isOpen, close, confirm } = useLoginDialog()

  return (
    <BaseDialog
      open={isOpen}
      primaryButton="confirm"
      onCancel={close}
      onConfirm={confirm}
      {...dialogMessages.login}
    />
  )
}

export default LoginDialog
