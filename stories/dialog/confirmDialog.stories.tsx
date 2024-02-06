import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { noop } from 'ramda-adjunct'
import ConfirmDialog from 'components/common/dialog/confirmDialog'
import useConfirmDialog from 'lib/application/hooks/ui/useConfirmDialog'
import useOnce from 'lib/utils/hooks/useOnce'

export default {
  title: 'dialog/Confirm Dialog',
  component: ConfirmDialog,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3753%3A8103'
    }
  }
} as ComponentMeta<typeof ConfirmDialog>

const Template: ComponentStory<typeof ConfirmDialog> = () => <ConfirmDialog />

export const CancelConfirmDialog = Template.bind({})
CancelConfirmDialog.decorators = [
  story => {
    const confirmDialog = useConfirmDialog()
    useOnce(() =>
      confirmDialog.open({
        title: '放棄發文',
        content: ['確定放棄此發文，', '一旦放棄將無法復原？'].join('\n'),
        primaryButton: 'cancel',
        onConfirm: noop,
        onCancel: noop
      })
    )
    return story()
  }
]

export const UnsavedConfirmDialog = Template.bind({})
UnsavedConfirmDialog.decorators = [
  story => {
    const confirmDialog = useConfirmDialog()
    useOnce(() =>
      confirmDialog.open({
        title: '尚未儲存',
        content: ['修改內容還沒儲存，', '是否要放棄編輯的內容？'].join('\n'),
        primaryButton: 'cancel',
        onConfirm: noop,
        onCancel: noop
      })
    )
    return story()
  }
]

export const DeleteConfirmDialog = Template.bind({})
DeleteConfirmDialog.decorators = [
  story => {
    const confirmDialog = useConfirmDialog()
    useOnce(() =>
      confirmDialog.open({
        title: '刪除發文',
        content: ['確定刪除此發文，', '一旦刪除將無法復原？'].join('\n'),
        primaryButton: 'cancel',
        onConfirm: noop,
        onCancel: noop
      })
    )
    return story()
  }
]

export const DeleteAvatarConfirmDialog = Template.bind({})
DeleteAvatarConfirmDialog.decorators = [
  story => {
    const confirmDialog = useConfirmDialog()
    useOnce(() =>
      confirmDialog.open({
        title: '刪除大頭貼',
        content: '刪除後會將頭貼改為系統預設圖片',
        primaryButton: 'confirm',
        onConfirm: noop,
        onCancel: noop
      })
    )
    return story()
  }
]

export const LogoutDialog = Template.bind({})
LogoutDialog.decorators = [
  story => {
    const confirmDialog = useConfirmDialog()
    useOnce(() =>
      confirmDialog.open({
        title: '登出帳號',
        content: '是否確定登出',
        primaryButton: 'confirm',
        onConfirm: noop,
        onCancel: noop
      })
    )
    return story()
  }
]

export const NetworkErrorDialog = Template.bind({})
NetworkErrorDialog.decorators = [
  story => {
    const confirmDialog = useConfirmDialog()
    useOnce(() =>
      confirmDialog.open({
        title: '無法存取',
        content: '網路似乎出了點狀況...',
        confirmText: '重新整理',
        onlyConfirm: true,
        onConfirm: noop,
        onCancel: noop
      })
    )
    return story()
  }
]
