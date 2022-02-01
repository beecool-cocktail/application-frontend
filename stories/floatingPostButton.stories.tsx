import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import FloatingPostButton from '../components/button/floatingPostButton'

export default {
  title: 'floatingPostButton',
  component: FloatingPostButton,
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof FloatingPostButton>

const Template: ComponentStory<typeof FloatingPostButton> = args => {
  return <FloatingPostButton {...args} />
}

export const Normal = Template.bind({})
