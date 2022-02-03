import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ConfirmDialog from 'components/common/dialog/confirmDialog'

export default {
  title: 'dialog/confirmDialog',
  component: ConfirmDialog,
  argTypes: {
    onConfirm: { action: 'confirm' },
    onCancel: { action: 'cancel' }
  }
} as ComponentMeta<typeof ConfirmDialog>

const Template: ComponentStory<typeof ConfirmDialog> = args => {
  return <ConfirmDialog {...args} />
}

export const DeleteConfirmDialog = Template.bind({})
DeleteConfirmDialog.args = {
  open: true,
  title: '刪除發文',
  content: '確定刪除此發文，一旦刪除將無法復原？'
}

export const CancelConfirmDialog = Template.bind({})
CancelConfirmDialog.args = {
  open: true,
  title: '尚未儲存',
  content: '修改內容還沒儲存，是否要放棄編輯的內容？'
}
