import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ShareButton from 'components/common/button/shareButton'

export default {
  title: 'button/Share Button',
  component: ShareButton,
  argTypes: {
    title: { type: 'string' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3227%3A5889'
    }
  }
} as ComponentMeta<typeof ShareButton>

const Template: ComponentStory<typeof ShareButton> = args => {
  return <ShareButton {...args} />
}

export const Normal = Template.bind({})
Normal.args = {
  title: 'Share String'
}

export const Contained = Template.bind({})
Contained.args = {
  title: 'Share String',
  contained: true
}
