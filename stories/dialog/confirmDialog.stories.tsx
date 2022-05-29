import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ConfirmDialog from 'components/common/dialog/confirmDialog'
import useStore from 'lib/services/storeAdapter'
import useOnce from 'lib/hooks/useOnce'

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
    const toInitialState = useStore(state => state.toInitialState)
    useOnce(() =>
      toInitialState({
        confirmDialogOpen: true,
        confirmDialogTitle: '放棄發文',
        confirmDialogContent: ['確定放棄此發文，', '一旦放棄將無法復原？'].join(
          '\n'
        )
      })
    )
    return story()
  }
]

export const UnsavedConfirmDialog = Template.bind({})
UnsavedConfirmDialog.decorators = [
  story => {
    const toInitialState = useStore(state => state.toInitialState)
    useOnce(() =>
      toInitialState({
        confirmDialogOpen: true,
        confirmDialogTitle: '尚未儲存',
        confirmDialogContent: [
          '修改內容還沒儲存，',
          '是否要放棄編輯的內容？'
        ].join('\n')
      })
    )
    return story()
  }
]

export const DeleteConfirmDialog = Template.bind({})
DeleteConfirmDialog.decorators = [
  story => {
    const toInitialState = useStore(state => state.toInitialState)
    useOnce(() =>
      toInitialState({
        confirmDialogOpen: true,
        confirmDialogTitle: '刪除發文',
        confirmDialogContent: ['確定刪除此發文，', '一旦刪除將無法復原？'].join(
          '\n'
        )
      })
    )
    return story()
  }
]
