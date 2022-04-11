import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import useConfirmDialog from 'lib/application/useConfirmDialog'

const ConfirmDialog = () => {
  const { isOpen, title, content, onConfirm, onCancel } = useConfirmDialog()
  return (
    <Dialog open={isOpen} onClose={onCancel}>
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
