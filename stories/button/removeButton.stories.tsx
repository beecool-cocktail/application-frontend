import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import RemoveButton from 'components/common/button/removeButton'

export default {
  title: 'button/removeButton',
  component: RemoveButton,
  argTypes: {
    disabled: { type: 'boolean' },
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof RemoveButton>

const Template: ComponentStory<typeof RemoveButton> = args => {
  return <RemoveButton {...args} />
}

export const Normal = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
