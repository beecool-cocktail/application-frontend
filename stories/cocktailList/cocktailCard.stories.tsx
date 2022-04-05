import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CocktailCard from 'components/common/cocktailCardList/cocktailCard'
import { mockCocktailPostItem } from 'lib/mocks/data/cocktail'

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

const Template: ComponentStory<typeof CocktailCard> = args => {
  return (
    <Box width={400} margin="0 auto">
      <CocktailCard {...args} />
    </Box>
  )
}

export const Normal = Template.bind({})
Normal.args = {
  cocktail: {
    ...mockCocktailPostItem,
    photoUrls: [
      'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
      'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1',
      'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg'
    ]
  }
}
