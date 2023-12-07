import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CocktailImageEditor from 'components/common/imageEditor/cocktailImageEditor'

export default {
  title: 'image/Cocktail Image Editor',
  component: CocktailImageEditor,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=6518-10249&t=VUL0DMGmKNqWOmxd-4'
    }
  }
} as ComponentMeta<typeof CocktailImageEditor>

const Template: ComponentStory<typeof CocktailImageEditor> = args => {
  return <CocktailImageEditor {...args} />
}

export const EditCocktailImage = Template.bind({})
EditCocktailImage.args = {
  imgSrc: '/cocktail.jpg'
}
