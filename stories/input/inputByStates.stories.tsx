import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box } from '@mui/material'
import Input from 'components/common/input/input'

export default {
  title: 'input/Normal Input/Input by States',
  argTypes: {
    onClick: { action: 'click' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2884%3A4341'
    }
  }
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => {
  return (
    <Box width="311px">
      <Input fullWidth {...args} />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Placeholder'
}

export const Selected = Template.bind({})
Selected.args = {
  autoFocus: true
}

export const Typing = Template.bind({})
Typing.args = {
  autoFocus: true,
  defaultValue: 'Content'
}

export const Filled = Template.bind({})
Filled.args = {
  defaultValue: 'Content'
}
