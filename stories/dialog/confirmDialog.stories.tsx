import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ConfirmDialog from 'components/common/dialog/confirmDialog'
import useStore from 'lib/services/storeAdapter'
import useOnce from 'lib/hooks/useOnce'

export default {
  title: 'dialog/Confirm Dialog',
  component: ConfirmDialog
} as ComponentMeta<typeof ConfirmDialog>

const Template: ComponentStory<typeof ConfirmDialog> = () => <ConfirmDialog />

export const DeleteConfirmDialog = Template.bind({})

DeleteConfirmDialog.decorators = [
  story => {
    const toInitialState = useStore(state => state.toInitialState)
    useOnce(() =>
      toInitialState({
        confirmDialogOpen: true,
        confirmDialogTitle: '刪除發文',
        confirmDialogContent: '確定刪除此發文，一旦刪除將無法復原？'
      })
    )
    return story()
  }
]

export const CancelConfirmDialog = Template.bind({})
CancelConfirmDialog.decorators = [
  story => {
    const toInitialState = useStore(state => state.toInitialState)
    useOnce(() =>
      toInitialState({
        confirmDialogOpen: true,
        confirmDialogTitle: '尚未儲存',
        confirmDialogContent: '修改內容還沒儲存，是否要放棄編輯的內容？'
      })
    )
    return story()
  }
]
