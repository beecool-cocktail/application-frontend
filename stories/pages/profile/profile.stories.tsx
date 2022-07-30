import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { rest } from 'msw'
import { move } from 'ramda'
import ProfileDetail from 'components/pages/profile/profileDetail'
import { configHandler, responseJson } from 'lib/mocks/handlers'
import {
  GetUserInfoResponse,
  GetSelfCocktailListResponse,
  GetUserFavoriteCocktailListResponse
} from 'sdk'

export default {
  title: 'profile/Profile',
  component: ProfileDetail,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9BFjANqSdCCk0cV8obeMCs/Whispering-Corner-Mobile?node-id=3745%3A7982'
    }
  }
} as ComponentMeta<typeof ProfileDetail>

const Template: ComponentStory<typeof ProfileDetail> = args => (
  <ProfileDetail {...args} />
)

const cocktails = [
  {
    cocktail_id: 1,
    photo: '/cocktail-1.jpg',
    title: '血腥瑪莉 Bloody Mary',
    user_name: '123123'
  },
  {
    cocktail_id: 2,
    photo: '/cocktail-2.jpg',
    title: 'Vodka Lime 伏特加萊姆',
    user_name: '123123'
  },
  {
    cocktail_id: 3,
    photo: '/cocktail-3.jpg',
    title: 'Mojito 家中特條款',
    user_name: '123123'
  },
  {
    cocktail_id: 3,
    photo: '/cocktail-1.jpg',
    title: 'Gin Tonic 琴湯尼',
    user_name: '123123'
  },
  {
    cocktail_id: 4,
    photo: '/cocktail-2.jpg',
    title: '橡木桶的寶藏',
    user_name: '123123'
  },
  {
    cocktail_id: 4,
    photo: '/cocktail-3.jpg',
    title: '我是測試調酒',
    user_name: '123123'
  },
  {
    cocktail_id: 5,
    photo: '/cocktail-1.jpg',
    title: '血腥瑪莉 Bloody Mary',
    user_name: '123123'
  },
  {
    cocktail_id: 6,
    photo: '/cocktail-2.jpg',
    title: '血腥瑪莉 Bloody Mary',
    user_name: '123123'
  },
  {
    cocktail_id: 7,
    photo: '/cocktail-3.jpg',
    title: '血腥瑪莉 Bloody Mary',
    user_name: '123123'
  },
  {
    cocktail_id: 8,
    photo: '/cocktail-2.jpg',
    title: '血腥瑪莉 Bloody Mary',
    user_name: '123123'
  },
  {
    cocktail_id: 9,
    photo: '/cocktail-3.jpg',
    title: '血腥瑪莉 Bloody Mary',
    user_name: '123123'
  },
  {
    cocktail_id: 10,
    photo: '/cocktail-2.jpg',
    title: '血腥瑪莉 Bloody Mary',
    user_name: '123123'
  }
]

const userInfoResponse: GetUserInfoResponse = {
  user_id: 1234,
  user_name: 'Heather H. Jenner',
  email: 'jenner@gmail.com',
  photo: '/avatar.png',
  number_of_collection: 15,
  number_of_post: 15,
  is_collection_public: true,
  coordinate: [],
  width: 0,
  length: 0
}

const userFavoriteCocktailListResponse: GetUserFavoriteCocktailListResponse = {
  is_public: true,
  total: 15,
  favorite_cocktail_list: move(-1, 0, cocktails)
}

export const Profile = Template.bind({})
Profile.args = {}
Profile.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get('/api/users/current', (_req, res, ctx) =>
        responseJson(res, ctx, userInfoResponse)
      ),
      rest.get('/api/users/current/cocktails', (req, res, ctx) => {
        const data: GetSelfCocktailListResponse = { cocktail_list: cocktails }
        return responseJson(res, ctx, data)
      }),
      rest.get('/api/users/current/favorite-cocktails', (req, res, ctx) =>
        responseJson(res, ctx, userFavoriteCocktailListResponse)
      )
    ]
  }
}

const userId = 1234

export const Visitor = Template.bind({})
Visitor.args = { userId }
Visitor.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get(`/api/users/${userId}`, (req, res, ctx) =>
        responseJson(res, ctx, userInfoResponse)
      ),
      rest.get(`/api/users/${userId}/cocktails`, (req, res, ctx) => {
        const data: GetSelfCocktailListResponse = { cocktail_list: cocktails }
        return responseJson(res, ctx, data)
      }),
      rest.get(`/api/users/${userId}/favorite-cocktails`, (req, res, ctx) =>
        responseJson(res, ctx, userFavoriteCocktailListResponse)
      )
    ]
  }
}

export const VisitorWithPrivateCollection = Template.bind({})
VisitorWithPrivateCollection.args = { userId }
VisitorWithPrivateCollection.parameters = {
  msw: {
    handlers: [
      configHandler,
      rest.get(`/api/users/${userId}`, (req, res, ctx) => {
        const data: GetUserInfoResponse = {
          ...userInfoResponse,
          is_collection_public: false,
          number_of_collection: 0
        }
        return responseJson(res, ctx, data)
      }),
      rest.get(`/api/users/${userId}/cocktails`, (req, res, ctx) => {
        const data: GetSelfCocktailListResponse = { cocktail_list: cocktails }
        return responseJson(res, ctx, data)
      }),
      rest.get(`/api/users/${userId}/favorite-cocktails`, (req, res, ctx) => {
        const data: GetUserFavoriteCocktailListResponse = {
          is_public: false,
          total: 0,
          favorite_cocktail_list: []
        }
        return responseJson(res, ctx, data)
      })
    ]
  }
}