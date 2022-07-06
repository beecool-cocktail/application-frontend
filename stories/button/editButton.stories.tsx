import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import EditButton from 'components/common/button/editButton'

export default {
  title: 'button/Edit Button',
  component: EditButton,
  argTypes: {
    onClick: { action: 'click' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3227%3A5894'
    }
  }
} as ComponentMeta<typeof EditButton>

const Template: ComponentStory<typeof EditButton> = args => {
  return <EditButton {...args} />
}

export const Normal = Template.bind({})

export const Contained = Template.bind({})
Contained.args = {
  contained: true
}
