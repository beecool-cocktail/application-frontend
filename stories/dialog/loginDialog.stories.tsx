import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import LoginDialog from 'components/common/dialog/loginDialog'
import useOnce from 'lib/utils/hooks/useOnce'
import useLoginDialog from 'lib/application/hooks/ui/useLoginDialog'

export default {
  title: 'dialog/Login Dialog',
  component: LoginDialog,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3753%3A8103'
    }
  }
} as ComponentMeta<typeof LoginDialog>

const Template: ComponentStory<typeof LoginDialog> = () => <LoginDialog />

export const Normal = Template.bind({})
Normal.decorators = [
  story => {
    const loginDialog = useLoginDialog()
    useOnce(loginDialog.open)
    return story()
  }
]
