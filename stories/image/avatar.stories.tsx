import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Avatar from 'components/common/image/avatar'
import { mockAvatar } from 'lib/mocks/data/photos'

export default {
  title: 'image/Avatar',
  component: Avatar,
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = args => {
  return <Avatar {...args} />
}

export const Normal = Template.bind({})
Normal.args = {
  src: mockAvatar,
  size: 84
}
Normal.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3300%3A6068'
  }
}

export const Outlined = Template.bind({})
Outlined.args = {
  src: mockAvatar,
  outlined: true,
  size: 70
}
Outlined.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3300%3A6068'
  }
}

export const UserId = Template.bind({})
UserId.args = {
  src: mockAvatar,
  userId: 1234,
  outlined: true,
  size: 70
}
UserId.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=4284%3A10501'
  }
}

export const PaddingUserId = Template.bind({})
PaddingUserId.args = {
  src: mockAvatar,
  userId: 1,
  outlined: true,
  size: 70
}
PaddingUserId.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=4284%3A10501'
  }
}
