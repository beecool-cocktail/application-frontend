import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import SubmitButton from 'components/common/button/submitButton'

export default {
  title: 'button/submitButton',
  component: SubmitButton,
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof SubmitButton>

const Template: ComponentStory<typeof SubmitButton> = args => {
  return <SubmitButton {...args} />
}

export const Normal = Template.bind({})
