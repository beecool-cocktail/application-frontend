import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import FloatingButton from 'components/common/button/floatingButton'

export default {
  title: 'button/FloatingButton',
  component: FloatingButton,
  argTypes: {
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
} as ComponentMeta<typeof FloatingButton>

const Template: ComponentStory<typeof FloatingButton> = args => {
  return (
    <Box>
      <Box
        sx={{ background: theme => theme.palette.grey[700], height: '120vh' }}
      />
      <FloatingButton {...args} />
    </Box>
  )
}

export const Normal = Template.bind({})
Normal.args = {
  disabled: false,
  children: 'Default'
}
