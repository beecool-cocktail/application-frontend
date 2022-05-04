import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from 'components/common/button/button'

export default {
  title: 'button/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' }
    },
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'radio' }
    },
    disabled: { type: 'boolean' },
    children: { type: 'string' },
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => {
  return <Button {...args} />
}

export const PrimaryDefault = Template.bind({})
PrimaryDefault.args = {
  children: 'Default',
  size: 'medium',
  variant: 'contained',
  disabled: false
}

export const PrimaryHover = Template.bind({})
PrimaryHover.args = {
  ...PrimaryDefault.args,
  children: 'Hover'
}
PrimaryHover.parameters = { pseudo: { hover: true } }

export const PrimaryActive = Template.bind({})
PrimaryActive.args = {
  ...PrimaryDefault.args,
  children: 'Pressed'
}
PrimaryActive.parameters = { pseudo: { active: true } }

export const PrimaryDisable = Template.bind({})
PrimaryDisable.args = {
  ...PrimaryDefault.args,
  children: 'Disable',
  disabled: true
}
