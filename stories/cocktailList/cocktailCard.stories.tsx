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
    cocktail_id: 1,
    title: 'Gin Tonic',
    tags: [],
    photos: [
      'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
      'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1',
      'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg'
    ],
    created_date: '2020',
    ingredients: [
      { name: '波本或裸麥威士忌', amount: 32, unit: 'L' },
      { name: '方糖', amount: 32, unit: 'L' },
      { name: '安格氏苦精', amount: 32, unit: 'L' }
    ],
    userInfo: {
      user_id: '1',
      user_name: 'Raven',
      email: '',
      photo: '',
      number_of_collection: 0,
      number_of_post: 0,
      is_collection_public: false
    }
  }
}
