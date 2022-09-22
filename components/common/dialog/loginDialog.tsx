import useAuth from 'lib/application/useAuth'
import useLoginDialog from 'lib/application/ui/useLoginDialog'
import BaseDialog from './baseDialog'

const LoginDialog = () => {
  const { open, setOpen } = useLoginDialog()
  const { askUserPermission } = useAuth()

  const handleClose = () => setOpen(false)

  return (
    <BaseDialog
      open={open}
      title="使用Google帳號登入"
      content="登入之後即可收藏"
      primaryButton="confirm"
      confirmText="前往登入"
      onCancel={handleClose}
      onConfirm={askUserPermission}
    />
  )
}

export default LoginDialog
