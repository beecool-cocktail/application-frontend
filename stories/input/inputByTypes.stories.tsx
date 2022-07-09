import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Box, Stack } from '@mui/material'
import Input from 'components/common/input/input'
import Search from 'lib/assets/search/default.svg'
import Close from 'lib/assets/cancelClose.svg'

export default {
  title: 'input/Input by Types',
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => {
  return (
    <Box width="311px">
      <Input fullWidth {...args} />
    </Box>
  )
}

export const Text = Template.bind({})
Text.args = {}

export const LeadingIcon = Template.bind({})
LeadingIcon.args = {
  startAdornment: <Search />
}

export const TrailingIcon = Template.bind({})
TrailingIcon.args = {
  defaultValue: 'ContentContentContent ContentContent',
  endAdornment: <Close />
}

export const LabelText = Template.bind({})
LabelText.args = {
  label: 'Label'
}

export const TextArea = Template.bind({})
TextArea.args = {
  defaultValue: '輸入的內容輸入的內容輸入的內容輸入的內容輸入的內容輸入的內容',
  multiline: true,
  maxLength: 150
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Placeholder'
}

export const CharacterLimit = Template.bind({})
CharacterLimit.args = {
  defaultValue: 'ContentContentContent',
  maxLength: 30
}

export const FeedbackText = Template.bind({})
FeedbackText.args = {
  feedback: 'FeedBack Content'
}

const SeparatedTemplate: ComponentStory<typeof Box> = () => {
  return (
    <Stack direction="row" spacing="2px">
      <Box width="230px">
        <Input fullWidth />
      </Box>
      <Box width="80px">
        <Input fullWidth />
      </Box>
    </Stack>
  )
}
export const Separated = SeparatedTemplate.bind({})
Separated.args = {
  defaultValue: 'Content'
}
