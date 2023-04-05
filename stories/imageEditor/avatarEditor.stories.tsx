import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import AvatarEditor from 'components/common/imageEditor/avatarEditor'

export default {
  title: 'image/Avatar Editor',
  component: AvatarEditor,
  argTypes: {
    type: {
      options: ['change', 'edit'],
      control: { type: 'select' }
    }
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=4898-14570&t=zPJZInZADoxLjd8j-4'
    }
  }
} as ComponentMeta<typeof AvatarEditor>

const Template: ComponentStory<typeof AvatarEditor> = args => {
  return <AvatarEditor {...args} />
}

export const ChangeAvatar = Template.bind({})
ChangeAvatar.args = {
  type: 'change',
  imgSrc: '/cocktail.jpg'
}

export const EditAvatar = Template.bind({})
EditAvatar.args = {
  type: 'edit',
  imgSrc: '/cocktail.jpg'
}
