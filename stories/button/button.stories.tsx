import React from 'react'
import { Box } from '@mui/system'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from 'components/common/button/button'

export default {
  title: 'button/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['small', 'large'],
      control: { type: 'radio' }
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' }
    },
    disabled: { type: 'boolean' },
    children: { type: 'string' },
    onClick: { action: 'click' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => {
  return (
    <Box
      width={1}
      height={300}
      sx={{ bgColor: theme => theme.palette.dark6.main }}
    >
      <Button {...args} />
    </Box>
  )
}

export const PrimaryDefault = Template.bind({})
PrimaryDefault.args = {
  children: 'Default',
  size: 'small',
  variant: 'primary',
  disabled: false
}

export const PrimaryHover = Template.bind({})
PrimaryHover.args = {
  ...PrimaryDefault.args,
  children: 'Hover'
}
PrimaryHover.parameters = { pseudo: { hover: true } }

export const PrimaryPressed = Template.bind({})
PrimaryPressed.args = {
  ...PrimaryDefault.args,
  children: 'Pressed'
}
PrimaryPressed.parameters = { pseudo: { active: true } }

export const PrimaryDisable = Template.bind({})
PrimaryDisable.args = {
  ...PrimaryDefault.args,
  children: 'Disable',
  disabled: true
}

export const SecondaryDefault = Template.bind({})
SecondaryDefault.args = {
  children: 'Default',
  size: 'small',
  variant: 'secondary',
  disabled: false
}

export const SecondaryHover = Template.bind({})
SecondaryHover.args = {
  ...SecondaryDefault.args,
  children: 'Hover'
}
SecondaryHover.parameters = { pseudo: { hover: true } }

export const SecondaryPressed = Template.bind({})
SecondaryPressed.args = {
  ...SecondaryDefault.args,
  children: 'Pressed'
}
SecondaryPressed.parameters = { pseudo: { active: true } }

export const SecondaryDisable = Template.bind({})
SecondaryDisable.args = {
  ...SecondaryDefault.args,
  children: 'Disable',
  disabled: true
}
