import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import ImageSelector from 'components/common/postEditor/imageSelector'
import { EditablePhoto } from 'lib/domain/photo'

export default {
  title: 'image/Image Selector',
  component: ImageSelector,
  argTypes: {
    onClick: { action: 'click' }
  }
} as ComponentMeta<typeof ImageSelector>

const Template: ComponentStory<typeof ImageSelector> = args => {
  return <ImageSelector {...args} />
}

const photo: EditablePhoto = {
  originURL: '/cocktail.jpg',
  editedURL: '/cocktail.jpg',
  shouldUploadImageFile: false
}

export const NormalWithoutImage = Template.bind({})
NormalWithoutImage.args = {
  isCover: false
}

export const NormalWithImage = Template.bind({})
NormalWithImage.args = {
  ...NormalWithoutImage.args,
  photo
}

export const CoverWithoutImage = Template.bind({})
CoverWithoutImage.args = {
  isCover: true
}

export const CoverWithImage = Template.bind({})
CoverWithImage.args = {
  ...CoverWithoutImage.args,
  photo
}
