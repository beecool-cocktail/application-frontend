import React from 'react'
import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import MyCocktailList from 'components/common/myCocktailList/myCocktailList'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import { GetSelfCocktailListResponse } from 'sdk'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useOnce from 'lib/hooks/useOnce'

const genDate = (index: number) =>
  `2022-11-09 11:07:${index.toString().padStart(2, '0')}`

export default {
  title: 'Cocktail/Cocktail List/My Cocktail List',
  component: MyCocktailList,
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
        rest.get('/api/users/current/cocktails', (req, res, ctx) => {
          const data: GetSelfCocktailListResponse = {
            cocktail_list: [
              {
                cocktail_id: 1,
                photo: '/cocktail.jpg',
                title: 'Gin Tonic',
                user_name: 'Mock User',
                created_date: genDate(0)
              },
              {
                cocktail_id: 2,
                photo: '/cocktail.jpg',
                title: 'Gin Tonic',
                user_name: 'Mock User',
                created_date: genDate(1)
              },
              {
                cocktail_id: 3,
                photo: 'cocktail.jpg',
                title: 'Gin Tonic',
                user_name: 'Mock User',
                created_date: genDate(2)
              }
            ]
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
} as ComponentMeta<typeof MyCocktailList>

const Template: ComponentStory<typeof MyCocktailList> = () => (
  <Box width={400} margin="0 auto">
    <MyCocktailList />
  </Box>
)

export const DefaultBehavior = Template.bind({})
