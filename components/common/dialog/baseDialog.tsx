import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material'
import { reverse } from 'ramda'
import Button, { ButtonProps } from 'components/common/button/button'

interface BaseDialogProps {
  open: boolean
  title: string
  content: string
  cancelText?: string
  primaryButton?: 'confirm' | 'cancel'
  confirmText?: string
  onlyConfirm?: boolean
  onConfirm(): void
  onCancel(): void
}

const BaseDialog = ({
  open,
  title,
  content,
  cancelText = '取消',
  confirmText = '確定',
  primaryButton = 'confirm',
  onlyConfirm = false,
  onCancel,
  onConfirm
}: BaseDialogProps) => {
  let btnVariants: Array<ButtonProps['variant']> = ['secondary', 'primary']
  if (primaryButton === 'cancel') btnVariants = reverse(btnVariants)

  return (
    <Dialog
      open={open}
      sx={{ '& .MuiDialog-paper': { minWidth: 327, padding: '16px' } }}
      onClose={onCancel}
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
        {!onlyConfirm && (
          <Button variant={btnVariants[0]} onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        <Button variant={btnVariants[1]} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Box>
    </Dialog>
  )
}

export default BaseDialog
