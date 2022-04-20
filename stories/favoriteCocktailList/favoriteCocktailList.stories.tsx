import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import FavoriteCocktailCardList from 'components/common/favoriteCocktailCardList/favoriteCocktailCardList'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import { GetUserFavoriteCocktailListResponse } from 'sdk'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useOnce from 'lib/hooks/useOnce'

export default {
  title: 'favorite cocktail list/Cocktail List',
  component: FavoriteCocktailCardList,
  argTypes: {
    cocktails: { control: { type: 'array' } }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5124'
    },
    msw: {
      handlers: [
        configHandler,
        rest.get('/api/users/current/favorite-cocktails', (req, res, ctx) => {
          const data: GetUserFavoriteCocktailListResponse = {
            favorite_cocktail_list: [
              {
                cocktail_id: 1,
                photo: '/cocktail.jpg',
                title: 'Gin Tonic',
                user_name: 'Mock User'
              },
              {
                cocktail_id: 2,
                photo: '/cocktail.jpg',
                title: 'Gin Tonic',
                user_name: 'Mock User'
              },
              {
                cocktail_id: 3,
                photo: 'cocktail.jpg',
                title: 'Gin Tonic',
                user_name: 'Mock User'
              }
            ],
            total: 3
          }
          return responseJson(res, ctx, data)
        })
      ]
    }
  },
  decorators: [
    story => {
      const storage = useLocalStorage()
      useOnce(() => storage.setToken('mock login token'))
      return story()
    }
  ]
} as ComponentMeta<typeof FavoriteCocktailCardList>

const Template: ComponentStory<typeof FavoriteCocktailCardList> = () => (
  <Box width={400} margin="0 auto">
    <FavoriteCocktailCardList />
  </Box>
)

export const DefaultBehavior = Template.bind({})
DefaultBehavior.args = {
  cocktails: [
    {
      id: 98078024211279,
      title: 'Gin Tonic',
      userName: 'Raven',
      photoUrl:
        'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Raspberry-Mojito-a9cb8d4.jpg?quality=90&resize=556,505'
    }
  ]
}
