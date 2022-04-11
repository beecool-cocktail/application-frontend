import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import useAuth from 'lib/application/useAuth'
import useLoginDialog from 'lib/application/useLoginDialog'

const LoginDialog = () => {
  const { open, setOpen } = useLoginDialog()
  const { askUserPermission } = useAuth()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sign in with Google</DialogTitle>
      <DialogContent>
        <Button onClick={askUserPermission}>Login</Button>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
