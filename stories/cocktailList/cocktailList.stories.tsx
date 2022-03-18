import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CocktailList from 'components/common/cocktailCardList/cocktailCardList'

export default {
  title: 'cocktailCardList/Cocktail List',
  component: CocktailList,
  argTypes: {
    cocktails: { control: { type: 'object' } }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5124'
    }
  }
} as ComponentMeta<typeof CocktailList>

const Template: ComponentStory<typeof CocktailList> = args => {
  return (
    <Box width={400} margin="0 auto">
      <CocktailList {...args} />
    </Box>
  )
}

export const Normal = Template.bind({})
Normal.args = {
  cocktails: [
    {
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
    },
    {
      cocktail_id: 1,
      title: 'Gin Tonic',
      tags: [],
      photos: [
        'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1',
        'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
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
    },
    {
      cocktail_id: 1,
      title: 'Gin Tonic',
      tags: [],
      photos: [
        'https://pbs.twimg.com/media/EVn2XrjUMAEfpMY.jpg',
        'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505',
        'https://www.eatthis.com/wp-content/uploads/sites/4/2019/03/old-fashioned-cocktail.jpg?fit=1200%2C879&ssl=1'
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
  ]
}
