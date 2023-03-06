import useAuth from 'lib/application/useAuth'
import useLoginDialog from 'lib/application/ui/useLoginDialog'
import dialogMessages from 'lib/constants/dialogMessages'
import BaseDialog from './baseDialog'

const LoginDialog = () => {
  const { open, setOpen } = useLoginDialog()
  const { askUserPermission } = useAuth()

  const handleClose = () => setOpen(false)

  return (
    <BaseDialog
      open={open}
      primaryButton="confirm"
      onCancel={handleClose}
      onConfirm={askUserPermission}
      {...dialogMessages.login}
    />
  )
}

export default LoginDialog
