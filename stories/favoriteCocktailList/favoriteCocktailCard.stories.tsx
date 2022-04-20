import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import FavoriteCocktailCard from 'components/common/favoriteCocktailList/favoriteCocktailCard'

export default {
  title: 'favorite cocktail list/Cocktail Card',
  component: FavoriteCocktailCard,
  argTypes: {
    cocktail: { control: { type: 'object' } },
    onRemove: { action: 'remove' }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5124'
    }
  }
} as ComponentMeta<typeof FavoriteCocktailCard>

const Template: ComponentStory<typeof FavoriteCocktailCard> = args => (
  <Box width={400} margin="0 auto">
    <FavoriteCocktailCard {...args} />
  </Box>
)

const mockCocktail = {
  id: 98078024211279,
  title: 'Gin Tonic',
  userName: 'Raven',
  photoUrl:
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505'
}

export const Default = Template.bind({})
Default.args = {
  cocktail: mockCocktail
}
