import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import FavoriteCocktailCardList from 'components/common/favoriteCocktailList/favoriteCocktailList'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import { GetUserFavoriteCocktailListResponse } from 'sdk'
import useOnce from 'lib/hooks/useOnce'
import useTokenStore from 'lib/application/auth/useTokenStore'

const genDate = (index: number) =>
  `2022-11-09 11:07:${index.toString().padStart(2, '0')}`

export default {
  title: 'Cocktail/Cocktail List/Favorite Cocktail List',
  component: FavoriteCocktailCardList,
  argTypes: {
    cocktails: { control: { type: 'array' } }
  },
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=2560%3A5124'
    },
    msw: {
      handlers: [
        configHandler,
        rest.get('/api/users/current/favorite-cocktails', (req, res, ctx) => {
          const data: GetUserFavoriteCocktailListResponse = {
            is_public: true,
            favorite_cocktail_list: [
              {
                cocktail_id: 1,
                photo: '/cocktail.jpg',
                title: 'Gin Tonic',
                user_name: 'Mock User',
                is_collected: true,
                collected_date: genDate(0)
              },
              {
                cocktail_id: 2,
                photo: '/cocktail.jpg',
                title: 'Gin Tonic',
                user_name: 'Mock User',
                is_collected: true,
                collected_date: genDate(1)
              },
              {
                cocktail_id: 3,
                photo: 'cocktail.jpg',
                title: 'Gin Tonic',
                user_name: 'Mock User',
                is_collected: true,
                collected_date: genDate(2)
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
      const tokenService = useTokenStore()
      useOnce(() => tokenService.setToken('mock login token'))
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
