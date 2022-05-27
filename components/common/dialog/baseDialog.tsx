import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material'
import Button from 'components/common/button/button'

interface BaseDialogProps {
  open: boolean
  title: string
  content: string
  cancelText?: string
  confirmText?: string
  onClose(): void
  onConfirm(): void
}

const BaseDialog = ({
  open,
  title,
  content,
  cancelText = '確定',
  confirmText = '取消',
  onClose,
  onConfirm
}: BaseDialogProps) => {
  return (
    <Dialog
      open={open}
      sx={{ '& .MuiDialog-paper': { minWidth: 327, padding: '16px' } }}
      onClose={onClose}
    >
      <DialogTitle
        variant="subtitle1"
        sx={{
          padding: 0,
          textAlign: 'center',
          color: theme => theme.palette.light1.main
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          mt: '8px',
          padding: 0,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme => theme.palette.light2.main,
            whiteSpace: 'pre-line'
          }}
        >
          {content}
        </Typography>
      </DialogContent>
      <Box
        sx={{
          mt: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          '& > *': { flex: 1 }
        }}
      >
        <Button onClick={onClose}>{cancelText}</Button>
        <Button variant="outlined" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Box>
    </Dialog>
  )
}

export default BaseDialog
