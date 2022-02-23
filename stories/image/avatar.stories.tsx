import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Avatar from 'components/common/image/avatar'

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
  src: 'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg',
  size: 100
}
