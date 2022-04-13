import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CocktailCard from 'components/common/cocktailCardList/cocktailCard'

export default {
  title: 'cocktailCardList/Cocktail Card',
  component: CocktailCard,
  argTypes: {
    cocktail: { control: { type: 'object' } },
    onCollect: { action: 'onCollect' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5124'
    }
  }
} as ComponentMeta<typeof CocktailCard>

const Template: ComponentStory<typeof CocktailCard> = args => (
  <Box width={400} margin="0 auto">
    <CocktailCard {...args} />
  </Box>
)

const defaultCocktail = {
  id: 98078024211279,
  title: 'Gin Tonic',
  ingredients: [
    { name: '波本或裸麥威士忌', amount: '3L' },
    { name: '方糖', amount: '3L' },
    { name: '安格氏苦精', amount: '3L' }
  ],
  userId: 1,
  userName: 'Raven',
  isCollected: false,
  photoUrls: [
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
    'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1',
    'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg'
  ]
}

export const Default = Template.bind({})
Default.args = {
  cocktail: defaultCocktail
}

export const Saved = Template.bind({})
Saved.args = {
  cocktail: {
    ...defaultCocktail,
    isCollected: true
  }
}

export const Skeleton = Template.bind({})
Skeleton.args = {
  cocktail: undefined
}
