import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import BackButton from 'components/common/button/backButton'

export default {
  title: 'button/Back Button',
  component: BackButton,
  argTypes: {
    onClick: { action: 'click' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3227%3A5890'
    }
  }
} as ComponentMeta<typeof BackButton>

const Template: ComponentStory<typeof BackButton> = args => {
  return <BackButton {...args} />
}

export const Normal = Template.bind({})

export const Contained = Template.bind({})
Contained.args = {
  contained: true
}
