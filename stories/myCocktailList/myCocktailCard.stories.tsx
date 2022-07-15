import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import MyCocktailCard from 'components/common/myCocktailList/myCocktailCard'

export default {
  title: 'my cocktail list/My Cocktail Card',
  component: MyCocktailCard,
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
} as ComponentMeta<typeof MyCocktailCard>

const Template: ComponentStory<typeof MyCocktailCard> = args => (
  <Box margin="0 auto" width="176px" height="171px">
    <MyCocktailCard {...args} />
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
