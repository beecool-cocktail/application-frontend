import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import DeleteButton from 'components/common/button/deleteButton'

export default {
  title: 'button/Delete Button',
  component: DeleteButton,
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof DeleteButton>

const Template: ComponentStory<typeof DeleteButton> = args => {
  return <DeleteButton {...args} />
}

export const Normal = Template.bind({})
