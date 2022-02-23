import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CounterTextField from 'components/common/input/counterTextField'

export default {
  title: 'input/Counter TextField',
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof CounterTextField>

const Template: ComponentStory<typeof CounterTextField> = args => {
  return <CounterTextField {...args} />
}

export const Normal = Template.bind({})
Normal.args = {}
