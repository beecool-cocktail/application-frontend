import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CocktailImageEditor from 'components/common/imageEditor/cocktailImageEditor'

export default {
  title: 'image/Cocktail Image Editor',
  component: CocktailImageEditor,
  argTypes: {
    type: {
      options: ['change', 'edit'],
      control: { type: 'select' }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof CocktailImageEditor>

const Template: ComponentStory<typeof CocktailImageEditor> = args => {
  return <CocktailImageEditor {...args} />
}

export const ChangeCocktailImage = Template.bind({})
ChangeCocktailImage.args = {
  type: 'change',
  imgSrc: '/cocktail.jpg'
}

export const EditCocktailImage = Template.bind({})
EditCocktailImage.args = {
  type: 'edit',
  imgSrc: '/cocktail.jpg'
}
