import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import LoginDialog from 'components/common/dialog/loginDialog'
import useOnce from 'lib/hooks/useOnce'
import useStore from 'lib/services/storeAdapter'

export default {
  title: 'dialog/Login Dialog',
  component: LoginDialog
} as ComponentMeta<typeof LoginDialog>

const Template: ComponentStory<typeof LoginDialog> = () => <LoginDialog />

export const Normal = Template.bind({})
Normal.decorators = [
  story => {
    const toInitialState = useStore(state => state.toInitialState)
    useOnce(() => toInitialState({ loginDialogOpen: true }))
    return story()
  }
]
