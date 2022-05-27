import useAuth from 'lib/application/useAuth'
import useLoginDialog from 'lib/application/useLoginDialog'
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
      onClose={handleClose}
      onConfirm={askUserPermission}
    />
  )
}

export default LoginDialog
