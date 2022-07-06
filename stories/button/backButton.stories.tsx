import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import BackButton from 'components/common/button/backButton'

export default {
  title: 'button/Back Button',
  component: BackButton,
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof BackButton>

const Template: ComponentStory<typeof BackButton> = args => {
  return <BackButton {...args} />
}

export const Normal = Template.bind({})
