import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ScrollToButton from 'components/common/button/scrollToButton'

export default {
  title: 'button/ScrollToButton',
  component: ScrollToButton,
  argTypes: {
    disabled: { type: 'boolean' },
    children: { type: 'string' },
    onClick: { action: 'click' }
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=6731%3A11514&t=hU57e5IQ4Reeci6G-4'
    }
  }
} as ComponentMeta<typeof ScrollToButton>

const Template: ComponentStory<typeof ScrollToButton> = args => {
  return (
    <Box>
      <Box
        sx={{ background: theme => theme.palette.grey[700], height: '100vh' }}
      />
      <ScrollToButton {...args} />
    </Box>
  )
}

export const Normal = Template.bind({})
Normal.args = {
  disabled: false,
  children: 'Default'
}
