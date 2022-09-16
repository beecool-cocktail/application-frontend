import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Avatar from 'components/common/imageEditor/avatarEditor'

export default {
  title: 'image/Avatar Editor',
  component: Avatar,
  argTypes: {
    title: { type: 'string' },
    imgSrc: { type: 'string' },
    onConfirm: { action: 'confirm' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    },
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = args => {
  return <Avatar {...args} />
}

export const PrimaryDefault = Template.bind({})
PrimaryDefault.args = {
  imgSrc: '/cocktail.jpg'
}
