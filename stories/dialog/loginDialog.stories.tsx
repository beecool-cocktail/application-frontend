import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import LoginDialog from 'components/common/dialog/loginDialog'

export default {
  title: 'dialog/loginDialog',
  component: LoginDialog,
  argTypes: {
    onClose: { action: 'close' }
  }
} as ComponentMeta<typeof LoginDialog>

const Template: ComponentStory<typeof LoginDialog> = args => {
  return <LoginDialog {...args} />
}

export const Normal = Template.bind({})
Normal.args = {
  open: true
}
