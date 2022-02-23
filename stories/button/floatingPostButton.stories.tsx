import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import FloatingPostButton from 'components/common/button/floatingPostButton'

export default {
  title: 'button/Floating Post Button',
  component: FloatingPostButton,
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof FloatingPostButton>

const Template: ComponentStory<typeof FloatingPostButton> = args => {
  return <FloatingPostButton {...args} />
}

export const Normal = Template.bind({})
