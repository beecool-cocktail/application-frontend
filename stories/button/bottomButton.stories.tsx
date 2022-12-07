import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import BottomButton from 'components/common/button/bottomButton'

export default {
  title: 'button/BottomButton',
  component: BottomButton,
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['static', 'fixed']
    },
    disabled: { type: 'boolean' },
    children: { type: 'string' },
    onClick: { action: 'click' }
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=6731%3A11355&t=hU57e5IQ4Reeci6G-4'
    }
  }
} as ComponentMeta<typeof BottomButton>

const Template: ComponentStory<typeof BottomButton> = args => {
  return (
    <Box>
      <Box
        sx={{ background: theme => theme.palette.grey[700], height: '120vh' }}
      />
      <BottomButton {...args} />
    </Box>
  )
}

export const FloatingButton = Template.bind({})
FloatingButton.args = {
  position: 'fixed',
  disabled: false,
  children: 'Default'
}

export const ScrollToBottom = Template.bind({})
ScrollToBottom.args = {
  position: 'static',
  disabled: false,
  children: 'Default'
}
