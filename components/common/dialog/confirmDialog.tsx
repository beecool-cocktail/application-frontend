import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'

interface ConfirmDialogProps {
  open: boolean
  title: string
  content: string
  onConfirm(): void
  onCancel(): void
}

const ConfirmDialog = ({
  open,
  title,
  content,
  onConfirm,
  onCancel
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={onConfirm}>確認</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
