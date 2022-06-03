import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ImageEditor from 'components/common/imageEditor/imageEditor'

export default {
  title: 'imageEditor/ImageEditor',
  component: ImageEditor,
  argTypes: {
    imgSrc: { type: 'string' },
    aspect: { type: 'number' },
    onConfirm: { action: 'confirm' },
    onCancel: { action: 'cancel' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof ImageEditor>

const Template: ComponentStory<typeof ImageEditor> = args => {
  return <ImageEditor {...args} />
}

export const PrimaryDefault = Template.bind({})
PrimaryDefault.args = {
  imgSrc: '/cocktail.jpg',
  aspect: 4 / 3
}
