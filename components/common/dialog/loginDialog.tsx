import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import useAuth from 'hooks/useAuth'

export interface LoginDialogProps {
  open: boolean
  onClose: () => void
}

const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const { askUserPermission } = useAuth()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign in with Google</DialogTitle>
      <DialogContent>
        <Button onClick={askUserPermission}>Login</Button>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
